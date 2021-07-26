//create mini express app
const exp=require("express")
const userApi=exp.Router();
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
userApi.use(exp.json())

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
userApi.get("/getusers",expressErrorHandler (async(req,res,next)=>{
    let userCollectionObj=req.app.get("userCollectionObj")
     userList=await userCollectionObj.find().toArray()
    res.send({message:userList})
}))

//getuser/<username>
/*
userApi.get("/getuser/:username",(req,res,next)=>{


    //get username from url params
    let un=req.params.username;


    //serach
    userCollectionObj .findOne({username:un})
    .then(userObj=>{
        if(userObj ===null){
            res.send({message:"user not existed"})
        }
        else{
            res.send({message:userObj})
        }
    })
    .catch(err=>{
        console.timeLog("err in reading user",err)
        res.send({message:err.messsage})
    })
    /*
    //search for user
    userCollectionObj.findOne({username:un},(err,userObj)=>
    {
        if(err)
        {
            console.log("err in reading users data",err)
            res.send({message:err.message})
        }
        if(userObj==null){
            res.send({message:"user not found"})
        }
        else
        {
            res.send({message:userObj})
        }
    })
})
    */
//get user from username
userApi.get("/getuser/:username",expressErrorHandler (async(req,res,next)=>{
    
    let userCollectionObj=req.app.get("userCollectionObj")

    let un=req.params.username;
    let userObj = await userCollectionObj.findOne({username:un})
    if(userObj===null)
    {
        res.send({message:"User not existed"})
    }
    else
    {
        res.send({message:userObj})
    }
}))






//http:user/createuser

userApi.post("/createuser",multerObj.single('photo'),expressErrorHandler (async(req,res,next)=>
{
    let userCollectionObj=req.app.get("userCollectionObj")

    let newUser=JSON.parse(req.body.userObj);
    let user=await userCollectionObj.findOne({username:newUser.username})
    if(newUser.name=="" || newUser.email=="" || newUser.username=="" || newUser.password=="" || newUser.confirmPassword=="" ){
        res.send({message:"Fill all the fields"})
    }
    else if(user !=null)
    {
        res.send({message:"User already existed"})
    }
    else if(newUser.password!=newUser.confirmPassword && newUser.password!=null && newUser.confirmPassword!=null){
        res.send({message:"Password and Confirm Password doesn't match"})
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
}))

/*
userApi.post("/createuser",(req,res,next)=>
{
    let newUser=req.body;
    userCollectionObj.findOne({username:newUser.username},(err,userObj)=>{
     if(err)
     {
         console.log("err in reading users data",err)
         res.send({message:err.message})
     }
     if(userObj==null){
         //create new user
         userCollectionObj.insertOne(newUser,(err,success)=>{
             if(err)
             {
                 console.log("err in reading users data",err)
                 res.send({message:err.message})
             }
             else{
                 res.send({message:"New user created"})
             }
         })
     }
     else{
         res.send({message:"User already existed"})
     }
    })
})*/

//updateuser
userApi.put("/updateuser/:username",expressErrorHandler (async(req,res,next)=>
{
    let userCollectionObj=req.app.get("userCollectionObj")

    let modifiedUser=req.body;
  await userCollectionObj.updateOne({username:modifiedUser.username},
    {$set:{ ...modifiedUser}})
    res.send({message:"User modified"})
}))
/*
userApi.put("/updateuser/:username",(req,res,next)=>
{
    //getmodified user
    let modifiedUser=req.body;

    //update
    userCollectionObj.updateOne({username:modifiedUser.username},{
        $set:{ ...modifiedUser}
    },(err,success)=>
    {
        if(err)
        {
            console.log("err in reading users data",err)
            res.send({message:err.message})
        }
        else{
            res.send({message:"User updated"})
        }

    })

})*/



userApi.delete("/deleteuser/:username",expressErrorHandler (async(req,res)=>
{ 
    let userCollectionObj=req.app.get("userCollectionObj")

    let un=req.params.username;
    let user=await userCollectionObj.findOne({username:un})
    if(user===null)
    {
        res.send({message:"user not existed"})
    }
    else{
        await userCollectionObj.deleteOne({username:un})
        res.send({message:"User deleted"})
    }
})) 



//user login
userApi.post('/login',expressErrorHandler(async(req,res)=>
{
    let userCollectionObj=req.app.get("userCollectionObj")

    //get user credentials
    let credentials=req.body;
    //search user by username
    let user=await userCollectionObj.findOne({username:credentials.username})
    if(user===null)
    {
        res.send({message:"Invalid username"})
    }
    else
    {
        //comapre the password
        let result=await bcryptjs.compare(credentials.password,user.password)
        if(result===false)
        {
            res.send({message:"Invalid password"})
        }
        else
        {
            //create a token
            let signedToken=jwt.sign({username:credentials.username},'abcdef',{expiresIn:10})
            res.send({message:"Login success",token:signedToken,username: 
            credentials.username,userObj:user})
        }
    }
}))


//dummy route to create protected resource

userApi.get("/testing",checkToken,(req,res)=>
{
    res.send({message:"This is protected data"})
})





//export

module.exports=userApi;

