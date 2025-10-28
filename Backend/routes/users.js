const express = require('express');
const router = express.Router();
const {registerUser, loginUsers, isloggedin,logout}= require('../controllers/auth');
const usermodel = require('../models/userModel');
const upload = require('../configs/multer');
const { body, validationResult } = require('express-validator');


router.post('/register',
  body('name').isLength({min:3}).withMessage("Name is too Short "),
    body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({min:4}).withMessage("Enter minimum 4 digit")
  
  ,registerUser);
router.post("/login",
    body('email').isEmail().withMessage("Please enter a valid email"),
  body('password').isLength({min:4}).withMessage("Enter minimum 4 digit")
  
  ,loginUsers)



router.get('/getuser',isloggedin,async(req,res)=>{
  try{
   const user = await req.user.populate("assignedTickets");
    res.status(200).json({message: "user fetched successfully", user})

  }catch(err){
    console.error(err);
    
  }

})


router.post('/updateuser', 
  body('name').isLength({min:3}).withMessage("Name is too short..!"),
  body('email').isEmail().withMessage("Enter email Correctly")
  
  ,upload.single("image"), isloggedin, async (req, res) => {
  try {

    const error = validationResult(req);
    if(!error){
      res.status(400).json({message:error.array()})
    }

    const user = req.user;
    const { name, email } = req.body;
    const updates = {};

    // Only add fields to updates if they are not empty
    if (name && name.trim() !== "") {
      updates.name = name.trim();
    }

    if (email && email.trim() !== "") {
      updates.email = email.trim();
    }

    // Handle image upload if present
    if (req.file) {
      updates.image = req.file.path; 
    }

    // Update user in database
    const updatedUser = await usermodel.findByIdAndUpdate(user._id, updates, { new: true });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success:true
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Something went wrong while updating profile" });
  }
});

router.post('/updaterole',isloggedin,async(req,res)=>{
  const {userid,role} = req.body ;
  console.log(userid,"iiii");
  
  try{
  const user = await usermodel.findByIdAndUpdate(userid,{role},{new:true})
  res.status(200).json({message:"User role updated successfully",user,success:true})
}catch(err){
    console.error(err);
    
  }
})

router.post("/logout",logout)





module.exports =router;