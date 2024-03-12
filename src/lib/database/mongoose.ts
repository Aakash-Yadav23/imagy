import mongoose, { Mongoose } from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL;


interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null
}


let cached: MongooseConnection = (global as any).mongoose;



if (!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}


export const connectToDatabase = async () => {
    console.log("Connecting To Database",);
    try {


        if (cached.conn) return cached.conn;



        if (!MONGODB_URL) throw new Error("MONGODB_URL Not Defined");




        cached.promise =
            cached.promise ||
            mongoose.connect(MONGODB_URL, {
                dbName: "imagy", bufferCommands: false
            })


        cached.conn = await cached.promise;

        console.log("Connected To Database",);
    } catch (error: any) {
        console.error("Error connecting to database", error);
        throw new Error("Error connecting to database", error);
    }
}