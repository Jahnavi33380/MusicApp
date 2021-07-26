const jwt=require("jsonwebtoken")

const checkToken =(req,res,next)=>{
    let tokenwithBearer=req.headers.authorisation;
    let token;


    if(tokenwithBearer===undefined){
        return res.send({message:"Unauthorized access"})
    }

    else{
        token=tokenwithBearer.split(" ")[1]
         jwt.verify(token,"abcdef",(err,decoded)=>{
             if(err)
             {
                 return res.send({message:"Session expired...login to continue..."})
             }
             else{
                 next()
             }
         })
    }
}

module.exports=checkToken;