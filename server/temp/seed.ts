require('dotenv').config()

import {ObjectId} from 'mongodb'
import {connectionDataBase} from '../src/database'
import {Equipment, User} from '../src/lib/types'

const equipments: Equipment[] = [
    {
        _id: new ObjectId("5fd09eff0b5d7803dc2e45ad"),
        number: '529',
        name: "Анализатор жидкости кондуктометр",
        model: "АНИОН-4120",
        admin: "Едигарьев Роман",
        area: "КАС 2.09",
        bookings: [],
        bookingsIndex: {},
        description: 'Диапазон измерения удельной электропроводности от 10-4 См/м до 10 См/м (от 1 мкСм/см до 105 мкСм/см), дискретность измерения: 10-5 См/м (0,1 мкСм/см) и 10-4 См/м в диапазоне от 10-4 до 10-1 См/м, 10-3 и 10-2 См/м в диапазоне от 0.1 до 10 См/м. Предел допускаемой осн. отн. погрешности измерения электропроводности ±2 % (не менее 1 мкСм/см). ' +
            'Диапазон измерения температуры от 0 до 50 °С с дискретностью 0,1 °С, предел допускаемой осн. абс. ' +
            'погрешности измерения температуры: ±0.3 °С',
        host: '',
        image: '',
        type: "СИ"
    },
    {
        _id: new ObjectId("5fd09eff0b5d7803dc2e45ae"),
        name: "Анализатор жидкости кондуктометр",
        number: 'В514794572',
        model: "SevenCompact S230",
        admin: "Едигарьев Роман",
        area: "КАС 2.09",
        bookings: [],
        bookingsIndex: {},
        description: 'Диапазон измерений УЭП комплекта от 0,1 мкСм/см до 106 мкСм/см, разрешение УЭП 0,1 мкСм/см, ' +
            'разрешение температуры 0,1 °С, диапазон измерений температуры в режиме АТС: от 0 до 100 °С, в режиме МТС: от -30 до 130 °С, ' +
            'предел допускаемой относительной погрешности измерений УЭП: ±5,0 %, ' +
            'предел допускаемой абсолютной погрешности при измерении температуры: ±0,5 °С.',
        host: '',
        image: '',
        type: "СИ"
    },
    {
        _id: new ObjectId("5fd09eff0b5d7803dc2e45af"),
        name: "Анализатор жидкости рН-метр",
        number: 'В609147067',
        model: "FiveEasy Plus FP20",
        admin: "Едигарьев Роман",
        area: "КАС 2.09",
        bookings: [],
        bookingsIndex: {},
        description: 'в комплекте с электродом комбинированным стеклянным LE410 или LE438, ' +
            'диапазон измерений pH от 1,00 до 14,00, диапазон измерений температуры от 0 до 80 °С, ' +
            'предел допускаемой основной погрешности при измерении pH: ±0,10, ' +
            'предел допускаемой основной погрешности при измерении температуры: ±1.0 °С',
        host: '',
        image: '',
        type: 'СИ'
    },
    {
        _id: new ObjectId("5fd09eff0b5d7803dc2e45b0"),
        name: "Анализатор общего углерода",
        number: 'H54405200133АЕ',
        model: "TOC-L CSN",
        admin: "Едигарьев Роман",
        area: "КАС 2.09",
        bookings: [],
        bookingsIndex: {},
        description: 'Диапазон измерений массовой концентрации общего углерода от 50 мкг/дм3 до 30000 мг/дм3, предел допускаемой СКО случайной составляющей погрешности: ' +
            'приведенное не более 1,5 % в диапазоне от 0 до 3300 мкг/дм3, ' +
            'относительное не более 1,5 % в диапазоне от 3300 мкг/дм3 до 30000 мг/дм3',
        host: '',
        image: '',
        type: "СИ"
    },

]
const users: User[] = [
    {
        _id: '5d378db94e84753160e08b55',
        avatar: '',
        bookings: [],
        contact: 'romzes2_09@mail.ru',
        equipments: [
            new ObjectId("5fd09eff0b5d7803dc2e45ad"),
            new ObjectId("5fd09eff0b5d7803dc2e45ae"),
            new ObjectId("5fd09eff0b5d7803dc2e45af"),
            new ObjectId("5fd09eff0b5d7803dc2e45b0"),
        ],
        income:12345,
        name: 'Роман Едигарьев',
        position: 'Заведующий СОЛО ОКК',
        token: 'token_************',
        walletId: 'acct_************',
    }
]

const seed = async () => {
    try {
        console.log('[seed]: running')
        const db = await connectionDataBase()

        for (const equip of equipments) {
            await db.equipments.insertOne(equip)
        }

        for (const user of users) {
            await db.users.insertOne(user)
        }

        console.log('[seed]: success')

    } catch (e) {
        throw new Error('failed to seed database')
    }
}

seed()
