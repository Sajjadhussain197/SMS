
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
 
export async function GET(request) {
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://mongodb:Fd1qyOKXEqnsY42L@cluster0.f6pehpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to your Atlas cluster
const client = new MongoClient(url);


try {
    const database=await client.db('ecommerce')
    const images= await database.collection('inventory')
        await client.connect();
        console.log("Successfully connected to Atlas");
        const query={ };
        const image=await images.find(query).toArray();
        console.log(image)

        return   NextResponse.json({"a": 35, image})
    } catch (err) {
            console.log(err.stack);
        }
        finally {
                await client.close();
            }
                
                // run().catch(console.dir);
                
                
         }