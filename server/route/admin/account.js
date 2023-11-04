require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Admin = require("../../model/admin/account");
const Rider = require("../../model/rider/account");
const accountMiddleware = require("../../middleware/account");

//send email with OTP
function sendVerificationMail(email, riderId, name) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Account verification successfully",
    text: `     Hello ${name}
                You are onborded to the MERU,
                Thank you for choosing us!
                Your riderId is ${riderId}
                `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { error: error };
    } else {
      console.log("Email sent: " + info.response);
      return resp.json({ success: true, message: info.response });
    }
  });
}

// Admin Login
router.post("/admin-login", async (req, resp) =>{
    const{email, password} = req.body;
    console.log(req.body);
    try{
        const admin = Admin.findOne(email);
        if(!admin)
        {
            return resp.json({
                success: false,
                msg: "Incorrect Credentials",
            });
        }
        // const validPassword = await bcrypt.compare(
        //     password,
        //     admin.password
        //);
        
        if (admin.password === password) {
            return resp.json({
                success: false,
                msg: "Incorrect Credentials",
            });
        }
        const token = jwt.sign(
            { _id: admin._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        resp.json({
            success: true,
            msg: "Login successful",
            token: token,
        });
    } catch (err) {
        resp.json({
            success: false,
            msg: err.message,
        });
    }
})

// Verify the rider
router.put("/admin-rider-verification", async(req,resp)=>{
    const {riderId} = req.body;
    try{
        const rider = await Rider.findOneAndUpdate({riderId :riderId}, {$set: {adminVerification :true}} , { new: true });
        if(!rider)
        {
            return resp.json({
                success: false,
                msg: "Incorrect rider Details",
            });
        }
        console.log(rider)
  
        sendVerificationMail(rider.email, riderId,rider.name );
        return resp.json({
            success: true,
            msg: "Verification done successfully",
          });

    }catch (err) {
        resp.json({
            success: false,
            msg: err.message,
        });
    }
})

// Get All riders 
router.get("/admin-get-riders",accountMiddleware, async(req,resp)=>{
    try{
        const riders = await Rider.find({});
        ;
        return resp.json({
            success: true,
            data : riders,
          });
    }catch (err) {
        resp.json({
            success: false,
            msg: err.message,
        });
    }
})


module.exports = router;