
import express from "express";
import User from "../modal/User.js";
import Student from "../modal/Student.js";
import { registerValidation ,StudentRegisterValidation } from "../validation/joi.js";
import CryptoJS from "crypto-js";
import  jwt  from "jsonwebtoken";
const router = express.Router();

// REGISTER USER

router.post('/signup', async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);

    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { password } = req.body;
    console.log("req.body===========",req.body)
    const hashPass = CryptoJS.AES.encrypt(password, process.env.PASS_KEY).toString();

    const newUser = new User({ ...req.body, password: hashPass });
    await newUser.save();

    res.status(200).send({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal Server Error",msg:err.message  });
  }
});

// LOGIN USER

const tokensInUse = [];
router.post('/login', async (req, res) => {
  try {
    const { email, } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const decryptedPasswordBytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
    const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);
    if (decryptedPassword !== req.body.password) {
      return res.status(400).json({ error: "Invalid password" });

    }

    const token = jwt.sign(
      {id:user._id,isAdmin:user.isAdmin},
       process.env.JWT_SEC, 
       { expiresIn: '3d' });

       tokensInUse.push(token);
       const {password , ...other}=user._doc
    res.status(200).json({...other,token});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error", msg:err.message });
  }
});




// LOGOUT USER
// router.get('/logout', async (req, res) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');

//     // Find the user based on the token
//     const user = await User.findOne({ 'token': token });

//     if (!user) {
//       return res.status(401).send({ error: 'User not found' });
//     }

//     // Remove the token from the user's tokens array
//     user.tokens = user.tokens.filter((storedToken) => storedToken !== token);
//     await user.save();

//     res.status(200).send({ message: 'Logout successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/logout', async (req, res) => {

  try {
    const token = req.header('Authorization')?.replace('Bearer ','');

console.log("token========",token)
    const tokenIndex = tokensInUse.indexOf(token);
    if (tokenIndex !== -1) {
      tokensInUse.splice(tokenIndex, 1);
    } else {
      return res.status(401).send({ error: 'Token not found' });
    }

   return res.status(200).send({ message: 'Logout successful' });
  } catch (err) {
    console.error(err);
 return   res.status(500).json({ error: 'Internal Server Error' });
  }
});





//Create Student 








export default router;

