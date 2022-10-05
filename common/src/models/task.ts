// External dependencies
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql"
// Class Implementation
@ObjectType()
export default class Task {
    @Field()
    public name!: string;
    @Field()
    public priority!: number;
    @Field()
    public status!: string;
    @Field(() => String)
    public _id?: ObjectId;

    constructor() { }

}