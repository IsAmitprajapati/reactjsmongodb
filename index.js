import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors())

const db = "mongodb+srv://login:amitprajapati@cluster0.fijppff.mongodb.net/?retryWrites=true&w=majority"


// 

mongoose.connect("mongodb://localhost:27017/logindb", {
    userNewUrlParse: true,
    useCreateIndex : true,
    useUnifiedTopology: true,
    useFindAndModify : false
}, () => {
    console.log("DB Connected")
})

//schema
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
})
//model
const UserModel = new mongoose.model("UserModel", userSchema)






//Routes
// app.get("/", (req, res) => {
//     res.send("Amit Database connected")
// })

app.post("/login", (req, res) => {
    // res.send("my api login")
    const {email, password } = req.body;
    UserModel.findOne({email : email},(err,user)=>{
        if(user){
            if(password === user.password){
                res.send({message : "Login successfull",user : user})
            }
            else{
                res.send({message : "Password didn't match"})
            }
        }
        else{
            res.send({message : "User not Registed"})
        }
    })

})

app.post("/register", (req, res) => {
    // res.send("my api register")
    const { fname, lname,   email, password } = req.body;
    UserModel.findOne({ email :   email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        }
        else {
            const user = new UserModel({
                fname,
                lname,
                email,
                password,
            })
            user.save((err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Successfully Registered" })
                }
            })
        }
    })


})

app.listen(9002, () => {
    console.log("BE started at port 9002")
})



// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// main().catch(err => console.log(err));