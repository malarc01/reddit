import { Resolver, Query } from "type-graphql";
import {Resolver,Query} from 'type-graphql'
@Resolver()
export class HelloResolver {
    @Query(()=>String)
    hello(){
        return 'hello homey'
    }
}