const express = require("express");
const mongoose =require("mongoose");
const userRouter= require("./router/user");
const app= express();

mongoose.connect("mongodb://127.0.0.1:27017/finance").then((e)=>{
    console.log("mongoDB connected");
})
app.set('view engine', 'ejs');


app.set('views', './views');
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'));
app.get("/",(req,res)=>{
    res.send("hellofced");
})
app.use("/user",userRouter);





app.listen(5000,console.log("server now started at 5000"));