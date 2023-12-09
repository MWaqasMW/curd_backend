import { v2 as cloudinary  } from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});


const uploadFile = async(localFile)=>{

try{
    if(!localFile) return 
    const res = await cloudinary.uploader.upload(localFile ,{resource_type:"image"})
    console.log("res.url=====",res.url)
    return res.url
}catch(err){
if(err)
return fs.unlinkSync(localFile)
    console.log("err=========",err.message)
}
}






