const express = require('express');
const router=express.Router();
const Subscriber=require('../models/subscriber');

const subscriber=new Subscriber({
    name:"Kartik",
    subscribedTo:"My Channel"
})

router.get('/',async (req,res)=>{
    try{
        return res.send(await Subscriber.find());
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong"});
    }
});

router.get('/:name' ,middleWare,(req,res)=>{
    return res.send(res.subscriber);
});

router.post('/',async (req,res)=>{
    const newSubscriber=new Subscriber({
        name:req.body.name,
        subscribedTo:req.body.subscribedTo,
    });
    let subscriber;
    try{
        subscriber= await Subscriber.findOne({name:req.body.name});
        if(null==subscriber){
            return res.send(await newSubscriber.save());
        }
        else{
            return res.status(400).json({message:`Name ${req.body.name} already exists`});
        }
    }
    catch(err){
        return res.status(500).json({message:"Soewthing went wrong"});
    }
});

router.delete('/:name',middleWare,async (req,res)=>{
    try{
        await res.subscriber.remove();
    }
    catch(err){
        return res.status(500).json({message:"Soewthing went wrong"});
    }
    res.send(subscriber);
});

async function middleWare(req,res,next){
    let subscriber;
    try{
        subscriber=await Subscriber.findOne({name:req.params.name})
        if(subscriber == null){
            return res.status(404).json({message:`Name ${req.params.name} not found`});
        }
    }
    catch(err){
        return res.status(500);
    }
    res.subscriber=subscriber;
    next();
}



module.exports=router;