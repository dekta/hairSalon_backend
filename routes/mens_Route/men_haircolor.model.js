const express = require("express")

const menHairColorrouter = express.Router()
 const { MenHairColorModel } = require("../../models/mens.model/menhaircoloring.model")





//  all data of mens spa and hair treatment
menHairColorrouter.get("/",async (req,res)=>{
    try{
        const data = await MenHairColorModel.find()
        res.status(200).send(data)
    }
    catch(err){
        res.status(401).send({"Error" : err})
    }
  

})



// data for paticular category
menHairColorrouter.get("/search/:ID",async (req,res)=>{
    const { name } = req.query
    const { ID } = req.params
    try{
        if(ID){
            const data = await MenHairColorModel.find({_id : ID})
        res.status(200).send(data)
        }else{
            const data = await MenHairColorModel.find({'name' : name})
            res.status(200).send(data)
        }
        
    }
    catch(err){
        res.status(401).send({"Error" : err})
    }
  

})




//  route to create new mens spa and treatment data
menHairColorrouter.post("/create", async(req,res)=>{
  const payload = req.body

  try{

    const data = new MenHairColorModel(payload)
    await data.save()
    res.status(200).send("Data added sucessfully")
  }catch(err){
    res.status(401).send({"Error" : err})
  }
})



// update any mens spa and tretment data
menHairColorrouter.put("/update/:ID" ,async(req,res)=>{
    const ID = req.params.ID
    const payload = req.body

    try{
        const app = await MenHairColorModel.findOne({_id:ID})
        if(app){
            await MenHairColorModel.findByIdAndUpdate({_id : ID},payload)
            res.status(200).send("Updation Sucessfull")
        }else{
            res.status(404).send("Not found")
        }
    }
    catch(err){
        res.status(400).send({"Error" : err})
    }
})


// delete
menHairColorrouter.delete("/delete/:ID" ,async(req,res)=>{
    const ID = req.params.ID
    

    try{
        const app = await MenHairColorModel.findOne({_id:ID})
        if(app){
            await MenHairColorModel.findByIdAndDelete({_id : ID})
            res.status(200).send("Deletion Sucessfull")
        }else{
            res.status(404).send("Not found")
        }
    }
    catch(err){
        res.status(400).send({"Error" : err})
    }
})

module.exports = { menHairColorrouter }