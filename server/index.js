import express from "express"
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const PORT = 9000;

connectToMongo();


app.use(cors());
app.use(express.json())
app.use(express.static("public/upload"));

app.get("/", (req,res) =>{
     res.send("api is running")
})


//api routes

app.use("/api/v1", authRoutes)


app.listen(PORT,()=>{
     console.log(`api is running on ${PORT}`)
});




