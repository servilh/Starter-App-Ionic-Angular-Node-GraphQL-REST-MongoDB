import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { tasks?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    try{
        dotenv.config();
 
        const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
                
        await client.connect();
            
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
    
        const tasksCollection: mongoDB.Collection = db.collection(process.env.TASKS_COLLECTION_NAME!);
    
        collections.tasks = tasksCollection;
        
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tasksCollection.collectionName}`);
    
    }catch(error) {
        throw Error("Database connection FAILED: " + error);
    }    
 }