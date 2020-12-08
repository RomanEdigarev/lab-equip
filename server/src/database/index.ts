import {MongoClient} from "mongodb";
import {Database} from '../lib/types'

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`

export const connectionDataBase = async () : Promise<Database> => {
    const client = await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const db = client.db('lab-equip-main')

    return {
        equipments: db.collection('equipments')
    }
}
