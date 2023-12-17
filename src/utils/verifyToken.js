import  jwt  from "jsonwebtoken";


const verifyToken =(req,res,next)=>{
    const authHeader =req.headers.token;
    if(authHeader){
const  token = authHeader.split(" ")[1];

        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err){ res.status(401).json("Token is not vaild");}
            req.user=user
            next()
        })
    }
    else{
     res.status(402).json("you are not authnticate");
        
    }
}