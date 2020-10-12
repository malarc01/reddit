import 'reflect-metadata'
import {MikroORM} from "@mikro-orm/core"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post";
import microConfig from './mikro-orm.config'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";

const main = async ()=>{

    const orm = await MikroORM.init(microConfig)
    // console.log(orm.em)
    // await orm.getMigrator().up()

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver,PostResolver],
            validate: false,
        }),
        context:()=>({em:orm.em})

    });
    apolloServer.applyMiddleware({app})

    app.listen(4000,()=>{
        console.log('SERVERING @  4K')
    })
    // const post = orm.em.create(Post,{title:'my first post'});
    // await orm.em.persistAndFlush(post);
    // console.log('------sql 2----------')
    // await orm.em.nativeInsert(Post,{title:'my first post 2'});
    // const posts = await orm.em.find(Post,{})
    // console.log('posts=>',posts)
}

main().catch((err)=>{
    console.error(err)
});
