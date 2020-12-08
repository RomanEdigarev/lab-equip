import {MongoClient} from "mongodb";
import {Database, Booking, User, Equipment} from '../lib/types'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`

export const connectionDataBase = async () : Promise<Database> => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = client.db('lab-equip-main')

    return {
        equipments: db.collection<Equipment>('equipments'),
        bookings: db.collection<Booking>('booking'),
        users: db.collection<User>('users')
    }
}
