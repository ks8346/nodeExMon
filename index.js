require('dotenv').config();

const express = require('express');
const app=express();
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true});
const db=mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log("Connected to DB"));
//passenv

const subscriberRouter=require('./routes/subscribers')
app.use('/subscribers',subscriberRouter);

app.listen(3000,()=>console.log('lsitening on 3000...'));