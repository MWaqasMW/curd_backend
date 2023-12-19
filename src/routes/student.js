import express from "express";
import Student from "../modal/Student.js";
import { StudentRegisterValidation } from "../validation/joi.js";
import {verifyToken} from "../utils/verifyToken.js"
import CryptoJS from "crypto-js";
import  jwt  from "jsonwebtoken";
const router = express.Router();
   


router.post('/createstudent',verifyToken, async (req, res) => {
    console.log("req.body ",req.body)
    
      try {
        const { error } = StudentRegisterValidation.validate(req.body);
    
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }
    
        const { password } = req.body;
        const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();
    
        const newStudent = new Student({ ...req.body, password: hashPass });
        await newStudent.save();
    
        res.status(200).send({ message: "Student Registration successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error",msg:err  });
      }
    });
    
    
    



    
    //Get All Student
    
    // Get All Students
    router.get('/allstudents',verifyToken, async (req, res) => {
      try {
        const allStudents = await Student.find();
    
        res.status(200).send({ students: allStudents });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error", msg: err.message });
      }
    });
    
    export default router