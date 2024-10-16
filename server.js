const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3060

const app = express ()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/CMS')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})

const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: String
})
const Users = mongoose.model("admin",userSchema)

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'login.html'))

})
app.post('/post',async(req,res)=>{
    const{name,email,password} = req.body
    const user = new Users({
        name,
        email,
        password
    })
    await user.save()
    console.log (user)
    res.sendFile(path.join(__dirname,'login.html'))

})


app.listen(port,()=>{
    console.log("Server started")
})