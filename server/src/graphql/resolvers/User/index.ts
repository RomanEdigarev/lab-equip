import {IResolvers} from 'apollo-server-express'
import {UserArgs, UserEquipmentsData, UserEquipmentsArgs} from './types'
import {User, Database} from '../../../lib/types'

export const userResolvers: IResolvers = {
  Query: {
    user: async (_root: undefined, {id}: UserArgs, {db}: { db: Database }): Promise<User | null> => {
      try {
        const user = await db.users.findOne({
          _id: id
        })

        if (!user) {
          throw new Error('Пользователь не найден')
        }

        return user

      } catch (e) {
        throw new Error(`Ошибка запроса к серверу: ${e}`)
      }
    }
  },
  User: {
    id: (user: User, __, ___): string => user._id,
    equipments: async (user: User, {limit, page}: UserEquipmentsArgs, {db}: { db: Database }): Promise<UserEquipmentsData | null> => {
      try {
        const data: UserEquipmentsData = {
          total: 0,
          result: []
        }

        let cursor = await db.equipments.find({
          _id: {$in: user.bookings}
        })

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await cursor.count()
        data.result = await cursor.toArray()

        return data

      } catch (e) {
        throw new Error(`Ошибка запроса оборудования ${e}`)
      }
    }
  }
}
