import {User} from '../model/user_model.js';
import jwt from 'jsonwebtoken';


export const authMiddleware = async(req,res,next)=>{
    let token;
    if(req?.headers?.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    try {
        if(token){
            const decode = jwt.verify(token,'secretkey');
            const user = await User.findById(decode?.userId);
            req.user = user;
            next();
        }
    } catch (error) {
        return res.json({message:error.message,error:"Not Authorized"});
    }
}else{
   return res.json({error:"No token in authorization"});
}

}
export const isAdmin = async(req,res,next)=>{
    console.log(req.user);
    const { email } = req.user;
    // Find the user by email
    const user = await User.findOne({email:email });
    if(user.isAdmin !== true){
        return res.json({message:"You are not admin"});
    }else{
        next();
    }
   
}

