const exp=require("express")
const app=exp()
const path=require("path")
  


//connect angular app with express server
app.use(exp.static(path.join(__dirname,'./dist/MusicApp')));



//import apis

const userApi=require("./APIS/user-api")
const adminApi=require("./APIS/admin-api")
const songsApi=require("./APIS/songs-api")

const mc=require("mongodb").MongoClient;

const databaseUrl="mongodb+srv://jahnavi:helloworld0987@jahnavig.iucmg.mongodb.net/firstdb?retryWrites=true&w=majority";

let userCollectionObj;
let songsCollectionObj;

//connect to db
mc.connect(databaseUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("err in db connection",err)
    }
    else
    {
        //get databse object
        let databaseObj=client.db("firstdb")
        //create usercollection object
        let userCollectionObj=databaseObj.collection("usercollection")
        let productCollectionObj=databaseObj.collection("productcollection")
        let adminCollection=databaseObj.collection("admincollection")
        let songsCollectionObj=databaseObj.collection("songscollection")
        app.set("userCollectionObj",userCollectionObj)
        app.set("productCollectionObj",productCollectionObj)
        app.set("adminCollection",adminCollection)
        app.set("songsCollectionObj",songsCollectionObj)
        console.log("connected to database")


    }
})






//execute specific api based on path
app.use("/user",userApi)
app.use("/admin",adminApi)
app.use("/browse",songsApi)



//invalid path
app.use((req,res,next)=>
{
    res.send({message:`path ${req.url} is invalid`})
})


//error handling middleware
app.use((err,req,res,next)=>
{
    res.send({message:`error id ${err.message}`})

})




//assign port

const port=3000
app.listen(port,() =>console.log(`server on ${port}...`))



/* TESTP.HTTP






###GET http://localhost:3000/users


###
###GET http://localhost:3000/user/100

###
###POST http://localhost:3000/createuser
###Content-Type: application/json

###{   "id":300,    "name":"Reethu"
}
<!--
###
PUT http://localhost:3000/updateuser/300
Content-Type: application/json

{
    "id":300,
    "name":"Senorita"
}

###
DELETE http://localhost:3000/deleteuser/100

###
POST http://localhost:3000/sum
Content-Type: application/json

{
    "a":"10",
    "b":"20"
}


###
GET http://localhost:3000/read



###
GET http://localhost:3000/user/getusers


###
GET  http://localhost:3000/htlio/getproducts
-->*/
