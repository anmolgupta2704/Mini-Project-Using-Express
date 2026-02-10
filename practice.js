const express=require('express');
const app=express();
const usermodel=require('./app');

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json());

app.get('/create',async(req,res)=>{
    const user=await usermodel.create({
        name:'John Doe',
        age:30,
        email:'john@gmail.com'
    });
    res.json(user);
});
app.get('/read',async(req,res)=>{
    const users=await usermodel.find({});
    res.json(users);
});
app.get('/update',async(req,res)=>{
    const user=await usermodel.findOneAndUpdate({name:'John Doe'},{age:31},{new:true});
    res.json(user);
});
app.get('/delete',async(req,res)=>{
    const user=await usermodel.findOneAndDelete({name:'John Doe'});
    res.json({message:'User deleted',user:user });
});


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
    