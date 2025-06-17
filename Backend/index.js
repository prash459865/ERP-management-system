import express from "express"
import dotenv from "dotenv"
import authRoutes from './routes/authRoute.js'
import dashBoardRoute from "./routes/dashBoardRoute.js"
import connectDB from "./lib/connectDB.js";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
const PORT = 4000;
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true 
}));
app.use('/',authRoutes)
app.use('/',dashBoardRoute)



app.listen(PORT, async()=>{
    console.log(`server is started at PORT ${PORT}`)
    await connectDB(process.env.MONGODB_URL)
})