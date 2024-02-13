import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser";

const app = express(); 
dotenv.config(  )
const connect =async()=>{
try{
    await mongoose.connect(process.env.MONGO)
    console.log("database connected successfully")
}catch(error){
    throw error;
}
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected")
})
mongoose.connection.on("connected", ()=>{
    console.log('mongoDb connected')
});
//middlewares
app.use(cookieParser())
app.use(express.json())


app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

//app.use((req,res,next)=>{
  //  console.log("hi ian, I am a middleware")
//})
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorMessage,
        message:errorMessage,
        stack: err.stack,
    });
})

app.listen(8800, ()=>{
    connect()
    console.log("connected to backend ian!")
})