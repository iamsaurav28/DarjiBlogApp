import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from  "jsonwebtoken";

class AuthController

{
static userRegisteration = async(req,res)=>{
 
     const {username, email, password} = req.body;
     try{
        if(username && email && password){
              const isUser = await authModel.findOne({email:email});
              if(!isUser){
                  const genSalt = await bcryptjs.genSalt(10);
                  const hashedPassword = await bcryptjs.hash(password,genSalt)
                  const newUser = new authModel({
                    username, 
                    email,
                    password: hashedPassword,
               })
                  const savedUser = await newUser.save();
                  if(savedUser){
                    return res.status(201).json({ message: "user registeration successfully" });
                  }
              }else{
          return res.status(400).json({ message: "email already register " });
              }
        }else{
          return res.status(400).json({ message: "all fields are required" });
        }
     }catch(error){
          return res.status(400).json({ message: error.message });
     }
}


static userLogin = async(req,res)=>{
                  const {email, password} =req.body;

                  try{
                    if(email && password){
                        const  isEmail = await authModel.findOne({email: email});
                        if(isEmail){
                        if(isEmail.email === email && 
                         (await bcryptjs.compare(password, isEmail.password))
                         ){
                              const token = jwt.sign({userID: isEmail._id}, "please calm down", {
                                   expiresIn: "2d",
                              });

                              return res.status(200).json({
                                   message:"login succesfully",
                                   token,
                                   name: isEmail.username,
                              })
                        }else{
                        return res.status(400).json({ message: "wrong credential" })
                        }
                            
                        }else{
                         return res.status(400).json({ message: "email id not found" })

                        }
                    }else{
                         return res.status(400).json({ message: " all fields are required" })
                    }
                  }catch(error){
          return res.status(400).json({ message: error.message })
                  }


}
}


export default AuthController;



