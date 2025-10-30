const express = require("express");
const router = express.Router();
const projectModel = require("../models/projectModel");

const upload = require("../configs/multer")
const { isloggedin } = require("../controllers/auth");
const companyModel = require("../models/companyModel");

router.post("/createproject", isloggedin, upload.single("image"), async (req, res) => {
    const { name, message, priority, manager } = req.body;
    console.log(req.body);

    const user = req.user;

    const company = await companyModel.findById(user.companyId)
    // console.log("company",company.projects);


    try {
        const project = await projectModel.create({
            image: req.file ? req.file.filename : null,
            name,
            message,
            priority,
            manager,
            Status:"Active",
            companyId: user.companyId,
        }

        );
        // console.log(project._id.toString())

        const company = await companyModel.findById(user.companyId)
        company.projects.push(project.id);
        await company.save();
        // console.log(project);

        return res.status(200).json({ message: "project added sussefully", project ,success:true})

    } catch (err) {
        console.log(err);

    }
})


router.get("/project/getbyid/:projectId", isloggedin, async (req, res) => {
    const projectid = req.params.projectId
    if (!projectid) {
        return res.status(400).json({ error: "project ID is required" });
    }
    try {
        const project = await projectModel.findById(projectid).populate("manager");
        if (!project) {
            res.status(404).json({ message: "no project found" })

        } else {
            // console.log(company);
            
            res.status(200).json({ message: "Project found", project })
        }
    } catch (err) {
        console.error(err);

    }
})


router.post("/updateproject", isloggedin, async (req, res) => {
    const { projectid, manager, status , priority } = req.body;

    if (!projectid) {
        return res.status(400).json({ error: "project ID is required" });
    }

    const updateFields = {};
    if (manager) updateFields.manager = manager;
    if (status) updateFields.status = status;
    if (priority) updateFields.priority = priority;

    try {
        const updatedproject = await projectModel.findByIdAndUpdate(
            projectid,
            updateFields,
            { new: true }
        );


        await updatedproject.save();

        if (!updatedproject) {
            return res.status(404).json({ error: "project not found" });
        }

        res.status(200).json({
            message: "project updated successfully",
            project: updatedproject,
            success: true
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



router.get("/getproject", isloggedin, async (req, res) => {
    try {
        const company = await companyModel.findById(req.user.companyId).populate({path:"projects",populate:{path:"manager"}});
        if (!company) {
            res.status(404).json({ message: "no company found" })

        } else {
            // console.log(company);
            
            res.status(200).json({ message: "company found", company })
        }
    } catch (err) {
        console.error(err);

    }
});

router.post("/dropproject",isloggedin,async(req,res)=>{
    const {projectId} = req.body;
    try{

    const Deltic = await projectModel.findByIdAndDelete({projectId});
        res.status(200).json({
            message: "Project Dropped successfully",
            
            success: true
        });
    }catch(err){
        console.error(err);
        
    }

});

module.exports = router;