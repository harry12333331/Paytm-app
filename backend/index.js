const express = require("express");
const app=express();
const cors=require("cors")
const mainRouter=require("./Routes/index")
const jwt=require("jsonwebtoken")
app.use(cors({
    origin:'http://localhost:5174' 
}))

app.use(express.json())
app.use("/api/v1",mainRouter);
app.use(express.json());

app.listen(3000);



