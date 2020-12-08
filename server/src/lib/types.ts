import {ObjectId, Collection} from 'mongodb'

export type Equipment = {
    _id: ObjectId
    number: number
    name: string
    model: string
}

export type Database = {
    equipments: Collection<Equipment>
}
