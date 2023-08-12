const mongoose=require('mongoose');
const Brandname=mongoose.Schema({
    brandname:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

// now this schema should be exported to mongodb cloud
// below export line will export the schema into the file.

module.exports=mongoose.model('brandname',Brandname);
