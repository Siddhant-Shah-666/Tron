const express = require("express")
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Jwt = require("jsonwebtoken")
const usermodel = require("../models/userModel")
const companymodel = require('../models/companyModel')
const invitemodel = require("../models/inviteModel");
const { isloggedin } = require("../controllers/auth");
// const usermodel = require("../models/userModel");
// const nodemailer = require("nodemailer");



router.post("/inviteuser", isloggedin, async (req, res) => {
  const { name, email, message, role } = req.body;
  const user = req.user;
  const token = uuidv4();

  try {
    const invite = await invitemodel.create({
      name,
      email,
      message,
      role,
      token,
      company: user.companyId,
      invitedBy: user._id,
      status: "Open",
    });

    const inviteLink = `${process.env.FRONTEND_URL}/invitepage/${token}`;

    // // Send email via Brevo API
    // await axios.post(
    //   "https://api.brevo.com/v3/smtp/email",
    //   {
    //     sender: {
    //       name: user.name,
    //       email: process.env.BREVO_USER, // must be a verified Brevo sender
    //     },
    //     to: [{ email }],
    //     subject: "You're Invited!",
    //     htmlContent: `
    //       <h2>Hello ${name},</h2>
    //       <p>${message}</p>
    //       <p><strong>Role:</strong> ${role}</p>
    //       <p>Click the link below to accept the invitation:</p>
    //       <a href="${inviteLink}">${inviteLink}</a>
    //       <br/><br/>
    //       <p>Best regards,<br/>${user.name}</p>
    //     `,
    //   },
    //   {
    //     headers: {
    //       "api-key": process.env.BREVO_API_KEY,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );

    res.status(200).json({
      inviteLink,
      message: "Invitation sent successfully ",
      success: true,
    });
  } catch (error) {
    console.error("Error sending invite:", error.response?.data || error);
    res.status(500).json({ message: "Failed to send invitation", success: false });
  }
});


router.post("/checkinvites/:invitetoken", isloggedin, async (req, res) => {
  const token = req.params.invitetoken;

  console.log(token, "invite be token");

  try {
    // Find invite
    const invite = await invitemodel.findOne({ token }).populate("company");
    if (!invite) {
      return res.status(400).json({ message: "Not invited" });
    }

    const user = req.user; 
    if (!user) {
      return res.status(401).json({ message: "Please login first" });
    }

    // Check if already in company
    const company = await companymodel.findById(invite.company);
    const alreadyMember = company.members.some(
      (m) => m.toString() === user._id.toString()
    );

    if (!alreadyMember) {
      company.members.push(user._id);
      await company.save();
    }

    // Update models
    invite.status = "Accepted";
    await invite.save();

    user.role = invite.role;
    user.companyId = invite.company;
    await user.save();

    await invitemodel.deleteOne({ _id: invite._id });

    res.status(200).json({
      message: "Invite accepted",
      invite,
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router