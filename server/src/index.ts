import {readFileSync} from "fs";
import {ApolloServer} from 'apollo-server-express'
import express, {Application} from 'express'
import {resolvers} from './graphql_old'
import {connectionDataBase} from "./database";


const typeDefs = readFileSync('src/graphql_old/schema.graphql_old', 'utf-8')

const main = async (app: Application) => {

    const db = await connectionDataBase()
    const server = new ApolloServer({typeDefs, resolvers, context: () => ({db})})

    server.applyMiddleware({app, path: '/api'})

    app.listen(process.env.PORT)

    console.log(`[app]: http://localhost:${process.env.PORT}`)

}


main(express())





