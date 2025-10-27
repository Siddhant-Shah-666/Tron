const express = require("express")
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Jwt = require("jsonwebtoken")
const usermodel = require("../models/userModel")
const companymodel = require('../models/companyModel')
const invitemodel = require("../models/inviteModel");
const { isloggedin } = require("../controllers/auth");
// const usermodel = require("../models/userModel");
const nodemailer = require("nodemailer");


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

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com", 
  port: 587,                   
  secure: false, 
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
      connectionTimeout: 30000, 
    greetingTimeout: 15000,
    });

    //email compose
    const mailOptions = {
      from: `"${user.name}" <${user.email}>`,
      to: email,
      subject: "You're Invited!",
      html: `
        <h2>Hello ${name},</h2>
        <p>${message}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p>Click the link below to accept the invitation:</p>
        <a href="${inviteLink}">${inviteLink}</a>
        <br/><br/>
        <p>Best regards,<br/>${user.name}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Invitation sent successfully via email!",
      mailOptions,
      success: true,
    });
  } catch (error) {
    console.error("Error sending invite:", error);
    res.status(500).json({ message: "Failed to send invitation", success: false });
  }
});


router.post("/checkinvites/:invitetoken", async (req, res) => {
  const token = req.params.invitetoken;

  console.log(token, "token");




  try {
    //finding invite 
    const invite = await invitemodel.findOne({ token }).populate("company")
    if (!invite) {
      return res.status(400).json({ message: "not invited" })
    }

    //  checking user login status
    let user = null;
    // console.log(req.cookies.token);

    if (req.cookies.token) {
      const decoded = Jwt.verify(req.cookies.token, "secret")
      console.log(decoded);

      user = await usermodel.findById(decoded.id)
      console.log(user);

    }
    if (!user) {
      return res.status(401).json({ message: "please login first" })
    }

    //check if user is already listed to company & if not then add it
    const company = await companymodel.findById(invite.company)
    const alreadymember = company.members.some((member) => {
      return member.toString() === user._id.toString()
    })

    if (!alreadymember) {
      company.members.push(user._id)
      await company.save()
    }
    //update invite status
    invite.status = "Accepted"
    await invite.save();

    //update user model
    user.role = invite.role
    user.companyId = invite.company
    await user.save()

    //delete invite after use
    await invitemodel.deleteOne({ _id: invite._id })

    res.status(200).json({ message: "invite accepted", invite, user, success: true })

  } catch (error) {
    console.error(error);

  }



})

module.exports = router