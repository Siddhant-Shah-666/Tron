const express = require("express");
const router = express.Router();
const chatmodel = require("../models/chatModel");
const upload = require("../configs/multer"); 
const { isloggedin } = require("../controllers/auth");

router.post("/fileupload", isloggedin, upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file was provided." });
        }
        // create and return url only not saving it in db
        const fileUrl =  req.file?.filename ;
        res.status(200).json({ fileUrl: fileUrl }); 

    } catch (err) {
        console.error("Error during file upload:", err);
        res.status(500).json({ message: "Server error during file upload." });
    }
});


// In your chat routes file (e.g., /routes/chatRoutes.js)

// GET /api/chats/:ticketId
// Fetches all chats for a specific ticket ID
router.get("/getchats/:ticketId", async (req, res) => {
    try {
        const chats = await chatmodel.find({ ticketId: req.params.ticketId })
            .sort({ createdAt: 1 }) // Show oldest messages first
            .populate("userId", "name"); // Get the user's name

        res.status(200).json(chats);
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ message: "Could not retrieve chat history." });
    }
});

// Make sure to mount this router in your main server file
// app.use('/api/chats', chatRoutes);

module.exports = router;