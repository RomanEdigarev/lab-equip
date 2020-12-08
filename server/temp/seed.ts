require('dotenv').config()

import {ObjectId} from 'mongodb'
import {connectionDataBase} from '../src/database'
import {Equipment} from '../src/lib/types'

const seed = async () => {
    try {
        console.log('[seed]: running')
        const db = await connectionDataBase()
        const equipments: Equipment[] = [
            {
                _id: new ObjectId(),
                number: 1,
                name: 'Анализатор жидкости кондуктометр',
                model: 'АНИОН-4120',
            },
            {
                _id: new ObjectId(),
                number: 2,
                name: 'Анализатор жидкости кондуктометр',
                model: 'SevenCompact S230',
            },
            {
                _id: new ObjectId(),
                number: 3,
                name: 'Анализатор жидкости рН-метр',
                model: 'FiveEasy Plus FP20',
            },
            {
                _id: new ObjectId(),
                number: 4,
                name: 'Анализатор общего углерода',
                model: 'TOC-L CSN',
            }

        ]

        for (const equip of equipments) {
            await db.equipments.insertOne(equip)
        }

        console.log('[seed]: success')

    } catch (e) {
        throw new Error('failed to seed database')
    }
}

seed()
