const express=require('express');
const app=express();
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://vivek8885:vivek@cluster0.iuhjpt0.mongodb.net/').then(()=>console.log('DB Connected'),
    err=>console.log(err)
)
app.get('/',(req,res)=>{
    res.send('Welcome to Griet');
})



app.listen(3000,()=>{
    console.log('Server Running');
})

// how to import the schema fo schema.js ?

const Brandname=require('./schema')

// now we need to get the values from the schema file
// in order to convert the data into string format.
// to use json we need below step.
app.use(express.json())

// now we need to post this data

app.post('/insert',async(req,res)=>{
    // to get the name value we ne need below line
    const { brandname } = req.body;

    try {
        let newBrand = new Brandname({
            brandname
        }); 

        await newBrand.save();
        return res.status(200).json(await Brandname.find());
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred' });
    }
 
})

app.get('/data',async(req,res)=>{
    try{
    const x = await Brandname.find();
    res.send(x);
    }
    catch(err){
        res.send('error');
    }
})

app.get('/brand/:brandname',async(req,res)=>{
    try{
        const findcar=req.params.brandname;
        const exist=await Brandname.findOne({brandname:findcar});
        if(exist){
            res.status(200).send(findcar+' is found in the database');
        }
        else{
            res.status(400).send(findcar+' is not found in the database');
        }
    }
    catch(err){
        res.status(404).send(err);
    }
})

app.delete('/delete/:brandname',async(req,res)=>{
    try{
        const del=req.params.brandname;
        const exist=await Brandname.findOneAndDelete(del);
        if(exist){
            res.send(del+' is deleted from the database');
        }
        else{
            res.status(400).send(del+' is not found in the database');
        }
    }
    catch(err){
        res.send(err);
    }
})