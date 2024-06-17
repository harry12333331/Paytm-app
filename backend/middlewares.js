const jwt =require('jsonwebtoken')
const JWT_secret=require('./config')

const authmiddleware=(req,res,next)=>{
    const auth =req.headers.authorization;
    if(!auth||!auth.startsWith("Bearer")){
        return res.status(403).json({})
    }
    const jwt =auth.split(' ')[1]
    try{
        const decoded=jwt.verify(jwt,JWT_secret)
        req.userid=decoded.userid
        next()
    }catch(err){
        return res.status(403).json({})
    }

}
module.exports={
    authmiddleware
}