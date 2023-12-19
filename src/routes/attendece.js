import express from "express";
import Attendence from "../modal/Attendece.js";
import { attendenceValidation } from "../validation/joi.js";
import {verifyToken} from "../utils/verifyToken.js"
import CryptoJS from "crypto-js";
import  jwt  from "jsonwebtoken";
const router = express.Router();
   


router.post('/addattendence',verifyToken, async (req, res) => {

    console.log("req.body ",req.body)
    
      try {
        const { error } = attendenceValidation.validate(req.body);
    
        if (error) {
          return res.status(400).send({ error: error.details[0].message });
        }
        const newAttendence = new Attendence({ ...req.body, });
        await newAttendence.save();
    
        res.status(200).send({ message: "Attendece Student successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error",msg:err.message  });
      }
    });
    
    
    
    router.patch('/updatestudent/:id', verifyToken, async (req, res) => {
        const { id } = req.params;
    
        try {
            const updatedFields = {};
    
            if (req.body.name) {
                updatedFields.name = req.body.name;
            }
    
            if (req.body.course) {
                updatedFields.course = req.body.course;
            }
    
            const updatedStudent = await Student.findByIdAndUpdate(id, updatedFields, { new: true });
    
            if (!updatedStudent) {
                return res.status(404).send({ error: "Student not found" });
            }
    
            res.status(200).send({ message: "Student information updated successfully", student: updatedStudent });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Internal Server Error", msg: err });
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