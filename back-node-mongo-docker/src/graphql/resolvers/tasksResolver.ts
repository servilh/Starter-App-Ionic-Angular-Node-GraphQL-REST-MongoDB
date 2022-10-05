import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import "reflect-metadata";
import Task from '../../../../common/src/models/task';
import { ObjectId } from "mongodb";
import { collections } from "../../services/database.service";

@InputType()
class TaskInput {
    @Field()
    name!: string;
    @Field()
    priority!: number;
    @Field()
    status!: string;
    @Field({ nullable: true })
    id!: string;
}

@Resolver()
export class TaskResolver {

    @Query(() => [Task])
    async getTasks() {
        return (await collections.tasks?.find({}).toArray());

    }

    @Query(() => Task)
    async getTask(@Arg("id") id: string) {
        const query = { _id: new ObjectId(id) };
        return (await collections.tasks?.findOne(query));
    }

    @Mutation(() => String)
    async createTask(
        @Arg("task") task: TaskInput
    ) {
        const result = await collections.tasks?.insertOne(task);

        return result?.insertedId;
    }

    @Mutation(() => String)
    async upsertTask(
        @Arg("task") task: TaskInput
    ) {

        if (task.id) {
            const query = { _id: new ObjectId(task.id) };
            const result = await collections.tasks?.updateOne(query, {
                $set: {
                    name: task.name,
                    status: task.status,
                    priority: task.priority
                }
            });
            return task.id;
        } else {
            const result = await collections.tasks?.insertOne(task);
            return result?.insertedId;
        }
    }

    @Mutation(() => String)
    async deleteTask(@Arg("id") id: string) {
        const query = { _id: new ObjectId(id) };
        if (collections.tasks) {
            const result = await collections.tasks.deleteOne(query);
            return id;       
        }
    }
}