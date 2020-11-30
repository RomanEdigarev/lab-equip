// eslint-disable-next-line @typescript-eslint/no-var-requires
import {readFileSync} from "fs";
import {ApolloServer} from 'apollo-server-express'
import express, {Application} from 'express'
import {resolvers} from './graphql'

require('dotenv').config();

const typeDefs = readFileSync('src/graphql/schema.graphql', 'utf-8')

const main = async (app : Application) => {

    const server = new ApolloServer({typeDefs, resolvers})

    server.applyMiddleware({app, path: '/api'})

    app.listen(process.env.PORT)

    console.log(`[app]: http://localhost:${process.env.PORT}`)
}

main(express())





