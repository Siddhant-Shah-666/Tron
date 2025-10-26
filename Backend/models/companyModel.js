const mongoose =require("mongoose")

const companySchema = mongoose.Schema({
    image:String,
    name:String,
    desc:String,
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
        
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    projects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"

    }]

},{timestamp:true});

const companyModel = mongoose.model("company",companySchema);

module.exports = companyModel;