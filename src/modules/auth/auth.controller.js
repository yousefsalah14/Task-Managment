import { User } from "../../../DB/models/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import  jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import { Token } from "../../../DB/models/token.model.js";


// sign  up 
export const signUp = asyncHandler(async (req,res,next)=>{
    // data from Request 
    const {name,email,password}=req.body

        // check user exist 
        const user = await User.findOne({email})
        if(user)return next(new Error("user already exist😊",{cause:409}))

        // hash password 
    const hashPassword = bcryptjs.hashSync(password,
        parseInt(process.env.SALT_ROUND))
        // create user
        await User.create({...req.body,password:hashPassword})
        // send response 
        res.status(201).json({success :true , message :"user  created Successfully✅"})
})
// sign in
export const signIn = asyncHandler(async (req,res,next)=>{
    // data from request 
    const {email ,password} = req.body
    // check emaill 
    if(!email && !mobileNumber) return next(new Error("you must enter a emaill!😒",{cause:400}))
    // check user 
    const user = await User.findOne({ email })
    if(!user) return next(new Error("User not Found!😊",{cause:404}))
    // check password 
const match = bcryptjs.compareSync(password,user.password)
if(!match) return next(new Error("invalid Password😊",{cause:401}))
//genrate token
const token = jwt.sign({email , id :user._id},process.env.SECERT_KEY)
// save token 
    await Token.create( { token, user: user._id } )
// send response 
return res.json({success:true ,results: {token}})
})