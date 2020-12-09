require('dotenv').config()

import {connectionDataBase} from '../src/database'

const seed = async () => {
    try {
        console.log('[clear]: running')
        const db = await connectionDataBase()

        const equipments = await db.equipments.find({}).toArray()
        const users = await db.users.find({}).toArray()
        const bookings = await db.bookings.find({}).toArray()

        if (equipments.length > 0) {
            db.equipments.drop()
        }

        if (users.length > 0) {
            db.users.drop()
        }

        if (bookings.length > 0) {
            db.bookings.drop()
        }


        console.log('[clear]: success')

    } catch (e) {
        throw new Error('failed to seed database')
    }
}

seed()
