require('dotenv').config();

import crypto from 'crypto'
import {Database, User, Viewer} from "../../../lib/types";
import {IResolvers} from 'apollo-server-express'
import {Google} from "../../../lib/api";
import {LoginArgs} from "./types";

const logInViaGoogle = async (code: string, token: string, db: Database): Promise<User> => {
    const {user} = await Google.logIn(code)

    if (!user) {
        throw new Error('Google login error')
    }

    // Name/Photo/Email Lists
    const userNamesList = user.names?.length ? user.names : null
    const userPhotosList = user.photos?.length ? user.photos : null
    const userEmailsList = user.emailAddresses?.length ? user.emailAddresses : null

    // User Display Name
    const userName = userNamesList ? userNamesList[0].displayName : null

    // User Id
    const userId = userNamesList && userNamesList[0]?.metadata?.source ? userNamesList[0].metadata.source.id : null

    // User Avatar
    const userAvatar = userPhotosList && userPhotosList[0]?.url ? userPhotosList[0].url : null

    // User Email
    const userEmail = userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null

    if (!userId || !userAvatar || !userEmail) {
        throw new Error('Google login error')
    }

    const updateRes = await db.users.findOneAndUpdate({_id: userId},
        {
            $set: {
                name: userName!,
                avatar: userAvatar,
                contact: userEmail,
                token
            }
        },
        {
            returnOriginal: false
        })

    let viewer = updateRes.value
    if(!viewer) {
        const insertResult = await db.users.insertOne({
            _id: userId,
            token,
            name: userName!,
            avatar: userAvatar,
            contact: userEmail,
            income: 0,
            bookings: [],
            equipments: [],
        })
        viewer = insertResult.ops[0]
    }

    return viewer
}

export const viewerResolver: IResolvers = {
    Query: {
        auth: () => {
            try {
                return Google.authUrl
            } catch (e) {
                throw new Error(`Failed to query Google Auth url: ${e}`)
            }
        }
    },
    Mutation: {
        logIn: async (_root: undefined, {input}: LoginArgs, {db}: { db: Database }): Promise<Viewer> => {
            try {
                const code = input ? input.code : null
                const token = crypto.randomBytes(16).toString("hex")
                const viewer: User | undefined = code ? await logInViaGoogle(code, token, db) : undefined

                if (!viewer) {
                    return {didRequest: true}
                }

                return {
                    _id: viewer._id,
                    token: viewer.token,
                    avatar: viewer.avatar,
                    walletId: viewer.walletId,
                    didRequest: true
                }
            } catch (e) {
                throw new Error(`Failed to log in ${e}`)
            }
        },
        logOut: (): Viewer => {
            try {
                return {didRequest: true}
            } catch (e) {
                throw  new Error('Failed to log out')
            }
        }
    },
    Viewer: {
        id: (viewer: Viewer): string | undefined => {
            return viewer._id
        },
        hasWallet: (viewer: Viewer): boolean | undefined => {
            return viewer.walletId ? true : undefined
        }
    }

}
