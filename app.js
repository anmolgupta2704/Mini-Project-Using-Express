const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongopractice');
const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    email:String
});
const User=mongoose.model('User',userSchema);

module.exports=User;

