import mongoose, { connect } from "mongoose";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connecteed: ${conn.connection.host}`);
    } catch(error){
        console.log(error);
    }
}