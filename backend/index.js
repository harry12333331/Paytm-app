const express = require("express");
const { User } = require("./db");
const app=express();
const cors=require("cors")
const mainRouter=require("./Routes/index")
const jwt =require("jsonwebtoken");

app.use("/api/v1",mainRouter);
app.use(express.json());
app.use(cors());
app.listen(3000);



