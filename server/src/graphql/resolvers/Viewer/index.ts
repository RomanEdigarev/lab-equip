require('dotenv').config();

import {IResolvers} from 'apollo-server-express'

export const viewerResolver: IResolvers = {
    Query: {
        auth: () => {
            return 'Query.auth'
        }
    },
    Mutation: {
        logIn: () => 'Mutation.logIn',
        logOut: () => 'Mutation.logOut'
    }

}
