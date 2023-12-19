import  jwt  from "jsonwebtoken";


export const verifyToken =(req,res,next)=>{
  const authHeader = req.headers;

    // console.log("authHeader=========",authHeader)
    if(authHeader){
// const  token = authHeader.split(" ")[1];

jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      res.status(401).json("Token is not valid");
    } else {
      req.user = user;
      next();
    }
  });
  
}
}

