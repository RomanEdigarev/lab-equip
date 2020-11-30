// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import express from 'express'
import {equipments} from './database/equipments'
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())

app.get('/', (_req, res) => {
    res.send('Hello world')
})

app.get('/equipments', (_req, res) => {
    res.send(equipments)
})

app.post('/delete-equip', (req, res) => {
    const id: string = req.body.id

    for (let i = 0; i < equipments.length; i++) {
        if (equipments[i].id === id) {
            return res.send(equipments.splice(i, 1))
        }
    }

    return res.send('hello world')
})


app.listen(process.env.PORT)

console.log(`[app]: http://localhost:${process.env.PORT}`)
