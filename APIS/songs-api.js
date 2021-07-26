//create mini express app
const exp=require("express")
const songsApi=exp.Router();
const expressErrorHandler=require("express-async-handler")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
//const path=require("path")


const checkToken=require("./middlewares/verifyToken")


const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")

//configure cloudinary
cloudinary.config({
    cloud_name:'drdbrthgk',
    api_key:'533191875719325',
    api_secret:'gIdlAAm6v1kr08CGpj7nELZ9btU',
})

const clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:async(req,file)=>{
        return{
            folder:"Jahnavi",
            public_id:file.fieldname+'-'+Date.now()
        }
    }
})

const multerObj=multer({storage:clStorage})



//add body parsing middleware
songsApi.use(exp.json())

//connect angular with current server


//import mongoclient

//get users
/*
//sample route
userApi.get("/getusers",(req,res,next)=>
{

    userCollectionObj.find().toArray()
    .then(userList => {res.send({message:usersList})
    .catch(err=>{
        console.log("error in reading u7sers",err)
        res.send({message:err.message})
        
    })
})
    /*
   //read docs from user collection
   userCollectionObj.find().toArray((err,usersList)=>{
    

       if(err)
       {
           console.log("err in reading users data",err)
           res.send({message:err.message})
       }
       else{
           res.send({message:usersList})
       }
    })*/

//get users
songsApi.get("/getsongs",expressErrorHandler (async(req,res,next)=>{
    let songsCollectionObj=req.app.get("songsCollectionObj")
     songsList=await songsCollectionObj.find().toArray()
    res.send({message:songsList})
}))




/*

//http:user/createuser

userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler (async(req,res,next)=>
{
    let userCollectionObj=req.app.get("userCollectionObj")

    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObj.findOne({username:newUser.username})
    if(user !=null)
    {
        res.send({message:"User already existed"})
    }
    else{
        //hash password
        let hashedPassword=await bcryptjs.hash(newUser.password,5)
        //replace password
        newUser.password=hashedPassword;

        newUser.profileImage=req.file.path;
        delete newUser.photo;
        await userCollectionObj.insertOne(newUser)
        res.send({message:"User created"})
    }
}))*/


//export

module.exports=songsApi;

