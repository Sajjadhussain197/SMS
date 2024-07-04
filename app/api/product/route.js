
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";
 
export async function GET(request) {
    console.log("entered")
// Replace the following with your Atlas connection string                                                                                                                                        
const url = "mongodb+srv://mongodb:Fd1qyOKXEqnsY42L@cluster0.f6pehpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to your Atlas cluster
const client = new MongoClient(url);


try {
    const database= client.db('ecommerce')
    const inventory=  database.collection('inventory')
        await client.connect();
        console.log("Successfully connected to Atlas");
        const query={ };
        const product=await inventory.find(query).toArray();
        console.log(product)

        return   NextResponse.json({product})
    } catch (err) {
            console.log(err.stack);
        }
        finally {
                await client.close();
            }
                
                // run().catch(console.dir);
                
                
         }
 export async function POST(request) {

            const url = "mongodb+srv://mongodb:Fd1qyOKXEqnsY42L@cluster0.f6pehpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
            const client = new MongoClient(url);
            
            
            try {
                const body= await  request.json();
                const database =   client.db('ecommerce');
                const inventory=  database.collection('inventory')
                    await client.connect();
                    const product=await inventory.insertOne(body)
                    console.log(product)
            
                    return   NextResponse.json({ product, ok:true})
                } catch (err) {
                        console.log(err.stack);
                    }
                    finally {
                            await client.close();
                        }
                            
                            // run().catch(console.dir);
                            
                            
                     }