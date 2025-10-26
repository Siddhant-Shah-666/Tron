const mongoose = require("mongoose");

const inviteSchema = mongoose.Schema({
    name :String,
    email: String,
    message: String,
    role:String,
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    invitedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    token: String,
    status: String,
    expiresAt : {
        type: Date,
        default:()=>{
              Date.now() + (1000 * 60 * 60 * 24 * 7)//7days
        }
    }
})

const inviteModel = mongoose.model("invite",inviteSchema);

module.exports = inviteModel;