import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
dotenv.config();
console.log("MongoDB URL:", process.env.MONGODB_URL);
import connectDB from './Mongodb/connect.js';
const app = express();
app.use(cors());
app.use(express.json({limit : '50mb'}));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get('/', async(req, res)=>{
    res.status(200).json({message:'Hello from Hugging Face API!',

    });
})

const startServer = async () => {

    try{
       await connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
    }catch(error){
        console.log(error);
    }
}
startServer();

