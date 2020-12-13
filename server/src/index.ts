
import {readFileSync} from "fs";
import {ApolloServer} from 'apollo-server-express'
import express, {Application, Response, Request} from 'express'
import {resolvers} from './graphql'
import {connectionDataBase} from "./database";
import cookieParser from "cookie-parser";


const typeDefs = readFileSync('src/graphql/schema.graphql', 'utf-8')

const main = async (app: Application) => {

    app.use(cookieParser(process.env.SECRET))

    const db = await connectionDataBase()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => ({db, req, res})
    })

    server.applyMiddleware({app, path: '/api'})

    app.listen(process.env.PORT)

    console.log(`[app]: http://localhost:${process.env.PORT}`)

}


main(express())





