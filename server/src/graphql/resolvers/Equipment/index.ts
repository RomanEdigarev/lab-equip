require('dotenv').config();

import {IResolvers} from 'apollo-server-express'
import { ObjectId } from 'mongodb';
import {Database, Equipment} from "../../../lib/types";

export const equipResolvers: IResolvers = {
    Query : {
        equipments: async (_root: undefined, _args: {}, {db} : {db: Database}): Promise<Equipment[]> => {
             return await db.equipments.find({}).toArray()
        }
    },
    Mutation: {
        deleteEquipments: async (_root: undefined, {id}, {db}: {db: Database}): Promise<Equipment> => {
            const deleteRes = await db.equipments.findOneAndDelete({_id: new ObjectId(id)})

            if (!deleteRes.value) {
                throw new Error('failed deleting')
            }

            return  deleteRes.value
        }
    },
    Equipment: {
        id: (equipment: Equipment): string => equipment._id.toString(),
    }
}
