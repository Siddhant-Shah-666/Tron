const mongoose = require("mongoose")

const chatSchema = mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    ticketId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ticket"
    },
    message:String,
    fileUrl:String
    
},{timestamp:true})

const chatModel = mongoose.model("chat",chatSchema);

module.exports = chatModel;