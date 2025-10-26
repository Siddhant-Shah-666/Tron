const express = require('express');
const Usermodel = require('../models/userModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');
const {  validationResult } = require('express-validator');



const registerUser = async (req, res) => {
  const isProduction = process.env.PORT;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  let { name, email, password } = req.body;
  try {

    //check existing user
    const existingUser = await Usermodel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" })
    }

    //create hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt)
    console.log(hash);

    //create user
    const user = await Usermodel.create({
      name,
      email,
      password: hash
    })
    console.log(user);


    // generate token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    //send res
    res.cookie("token", token, {
  httpOnly: true,
  secure: isProduction, 
  sameSite: isProduction ? false : "Lax",
}).status(201).json({ user,message: "user created", token, success: true })


  } catch (err) {
    console.log(err)
  }
}


const loginUsers = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  console.log(req.body);

  const { email, password } = req.body;
  console.log(email);


  try {
    let user = await Usermodel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "email not found" })
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "lollll" })
      }
      else if (!result) {
        return res.status(400).json({ message: "password not match , u fraud" })
      }
      else {
        const token = jwt.sign({ id: user._id }, "secret");
       res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", 
  sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
}).status(201).json({user, message: "login success", token, success: true, companyId: user.companyId })

      }

    })

  } catch (err) {
    console.log(err);

  }

}



const isloggedin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log(token);

    if (!token) {
      return res.status(200).json({ message: "Not Authorize, login first" })
    }
    else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.id);
      next()
    }

  } catch (err) {
    console.log(err);

  }

}

const logout = async (req, res) => {
  console.log("logout");
  
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logged out successfully" })
}

module.exports = { registerUser, loginUsers, isloggedin, logout }