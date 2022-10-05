// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Task from "../../../common/src/models/task";
import ApiResult from "../../../common/src/models/apiResult";
// Global Config
export const tasksRouter = express.Router();

tasksRouter.use(express.json());
// GET
tasksRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if(collections.tasks) {
            const tasks = await collections.tasks.find({}).toArray();
            
            res.status(200).send(tasks);
        }
        
    } catch (error:any) {
        res.status(500).send(error.message);
    }
});
tasksRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        
        const query = { _id: new ObjectId(id) };
        if(collections.tasks) {
            const task = (await collections.tasks.findOne(query)) as Task | null;

            if (task) {
                res.status(200).send(task);
            }
        }
        
    } catch (error) {
        res.status(404).send(new ApiResult( `Unable to find matching document with id: ${req.params.id}` ));
    }
});
// POST
tasksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newTask = req.body as Task;
        if(collections.tasks) {
            const result = await collections.tasks.insertOne(newTask);

            result
                ? res.status(201).send(new ApiResult( `Successfully created a new task with id ${result.insertedId}`))
                : res.status(500).send(new ApiResult( "Failed to create a new task." ));
        }        
    } catch (error: any) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// PUT
tasksRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedTask: Task = req.body as Task;
        const query = { _id: new ObjectId(id) };
        if(collections.tasks) {
            const result = await collections.tasks.updateOne(query, { $set: { 
                name: updatedTask.name,
                status: updatedTask.status,
                priority: updatedTask.priority
            } });
            result
            ? res.status(200).send(new ApiResult( `Successfully updated task with id ${id}` ))
            : res.status(304).send(new ApiResult( `Task with id: ${id} not updated` ));
        }
        
       
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
// DELETE
tasksRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        if(collections.tasks) {
            const result = await collections.tasks.deleteOne(query);

            if (result && result.deletedCount) {
                res.status(202).send(new ApiResult( `Successfully removed task with id ${id}` ));
            } else if (!result) {
                res.status(400).send(new ApiResult( `Failed to remove task with id ${id}` ));
            } else if (!result.deletedCount) {
                res.status(404).send(new ApiResult( `Task with id ${id} does not exist`));
            }
        }
        
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});