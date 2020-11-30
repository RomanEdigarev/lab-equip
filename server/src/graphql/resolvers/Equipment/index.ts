import {IResolvers} from 'apollo-server-express'

export const equipResolvers: IResolvers = {
    Query : {
        equipments: async () => {
            return 'Hello from query'
        }
    },
    Mutation: {
        deleteEquipments: async () => {
            return 'Hello from mutation'
        }
    }
}
