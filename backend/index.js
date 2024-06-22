const express = require("express");
const app=express();
const cors=require("cors")
const mainRouter=require("./Routes/index")


app.use("/api/v1",mainRouter);
app.use(express.json());
app.use(cors());
app.listen(3000);



