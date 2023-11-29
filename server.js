const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const adminRoutes = require('./routes/adminRoutes');
const userroutes=require('./routes/userRoutes');

app.use('/',express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(userroutes);
app.use('/admin', adminRoutes);


mongoose.connect("mongodb://localhost:27017/Tak-Management-System")
.then(()=>{
    console.log("Mongo DB Connection Successs");
    app.listen(3000,()=>{
        console.log("listening to port 3000");
    })
}
).catch(()=>{
    console.log("Error occured while connecting to mongodb");
})

module.exports=app;

