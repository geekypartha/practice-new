const express = require('express');
const dotenv = require('dotenv');
const notes = require('./data/page1')
const cors = require('cors');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')


const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));

dotenv.config();
connectDB();
const PORT = 5000;
app.listen(PORT, console.log(`api is listening at port ${PORT} `));

app.get("/", (req,res)=>{
    res.send("API is running successfully");
});

app.use("/api/users", userRoutes)

app.get("/api/data",(req,res)=>{
    res.send(notes);
});