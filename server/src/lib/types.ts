import {ObjectId, Collection} from 'mongodb'

export type Viewer = {
    _id?: string,
    token?: string,
    avatar?: string,
    walletId?: string,
    didRequest: boolean
}

export type EquipmentType = 'СИ' | 'ИО' | 'ВО'

type BookingsIndexMonth = {
    [key: string]: boolean
}

type BookingsIndexYear = {
    [key: string]: BookingsIndexMonth
}

type BookingsIndex = {
    [key: string]: BookingsIndexYear
}

export type Equipment = {
    _id: ObjectId
    number: string
    name: string
    model: string
    description: string
    image: string
    host: string
    type: EquipmentType
    area: string
    admin: string
    bookings: ObjectId[]
    bookingsIndex: BookingsIndex
}

export type User = {
    _id: string
    token: string
    name: string
    avatar: string
    position?: string
    contact: string
    walletId?: string
    income: number
    bookings: ObjectId[]
    equipments: ObjectId[]
}

export type Booking = {
    _id: ObjectId
    equipment: ObjectId,
    tenant: string,
    checkIn: string,
    checkOut: string
}

export type Database = {
    equipments: Collection<Equipment>
    users: Collection<User>
    bookings: Collection<Booking>
}
