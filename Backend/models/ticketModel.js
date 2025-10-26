const mongoose = require("mongoose")

const ticketSchema = mongoose.Schema({
    name:String,
    message:String,
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    assignedTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        default:null
    },
    priority: String,
    status : String,
    ticketType : String,
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    history: [
  {
    change: String,        
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    date: { type: Date, default: Date.now }
  }
]
}, {timestamps:true})

const ticketModel = mongoose.model("ticket",ticketSchema);

module.exports = ticketModel