import { log } from 'console';
import { connect } from 'http2';
import mongoose from 'mongoose'


const connectToDb = async () => {
    try {
        await mongoose.connect("mongodb+srv://mstphiderkaoui:D7Vshv4yZf9l874U@cluster0.q3lzg.mongodb.net/chatemate?retryWrites=true&w=majority&appName=Cluster0",{})
        console.log("--------------------------------------------");
        console.log(" ✅ Connected to mongodb ");
        console.log("--------------------------------------------");
        log()
        
    } catch (error) {
        console.log("--------------------------------------------");
        console.log("❌ Failed to connect to mongodb atlas");
        console.log("--------------------------------------------");

    }
}

export default connectToDb