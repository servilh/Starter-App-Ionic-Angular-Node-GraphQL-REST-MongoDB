// External dependencies
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql"
// Class Implementation
@ObjectType()
export default class Game {
    @Field()
    public name!: string;
    @Field()
    public price!: number;
    @Field()
    public category!: string;
    @Field(() => String)
    public _id?: ObjectId;

    constructor() { }

}