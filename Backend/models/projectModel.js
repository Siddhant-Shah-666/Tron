const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    image:String,
    name:String,
    message:String,
    priority:String,
    
    manager:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:String,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    tickets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ticket"
    }]
},{timestamps:true});

const projectModel = mongoose.model("project",projectSchema);

module.exports=projectModel;