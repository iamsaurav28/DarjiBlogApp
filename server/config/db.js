import mongoose from "mongoose";

const connectToMongo = async()=>{
     try{
          const conn= await mongoose.connect(process.env.MONGO_URI,{
               useUnifiedTopology: true,
               useNewUrlParser: true,
               
          });
          console.log(`MongoDb connected to : ${conn.connection.host}`)
     }catch(error){
          console.error(`Error: ${error.message}`);
          process.exit();
     }
}

export default connectToMongo;