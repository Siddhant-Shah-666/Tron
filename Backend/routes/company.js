
const express  = require("express")
const router =express.Router()
const companymodel = require("../models/companyModel");
// console.log("hellloooo");
const upload = require('../configs/multer');
const { isloggedin } = require("../controllers/auth");



router.post("/createcompany",isloggedin,upload.single("image"), async (req,res)=>{
    // console.log("hell");
    
    // console.log(req.body.desc);
    const user = req.user;
    const {name,desc} = req.body;
    try{
        console.log("helll nnno");
        let company = await companymodel.create({
            image:req.file? req.file.filename : null,
            name,
            desc,
            admin : user._id
            
        });
        company.members.push(user._id)
        await company.save();
        user.companyId = company._id;
        user.role = "Admin"
        await user.save();
        return res.status(200).json({message:"company created successfully",company,user,success:true})
        


    }catch(err){
        console.log(err);
        
    }
})


router.get("/getcompany",isloggedin,async(req,res)=>{
    try{

        const company = await companymodel.findById(req.user.companyId).populate("members").populate("projects");
        if(!company){
            res.status(404).json({message:"no company found"})
        
        }else{
            res.status(200).json({message:"company found",company})
        }
    }catch(err){
        console.error(err);
        
    }
})
module.exports=router;