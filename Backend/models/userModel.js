const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    companyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company",
        default:null
    },
    role:String,
    assignedTickets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ticket",
        default:null
    }],
    completedTickets:[{
        type:String
    }]
},
{timestamps:true}
);

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;