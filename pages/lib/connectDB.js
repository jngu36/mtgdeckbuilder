/**
import mongoose from "mongoose";    

const connectDB = async () => await mongoose.connect(process.env.MONGO);

export default connectDB; */

import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    
    await mongoose.connect(process.env.MONGO);
    return handler(req, res);
};

export default connectDb;