var express= require('express')
//const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const auth=require('./routes/API/auth')
const profile=require('./routes/API/profile')
const questions=require('./routes/API/questions')

var app=express();
//middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//databse connnection
//const db=require('./setUp/myUrl').mongoURL;
// mongoose
//     .connect((db))
//     .then(()=>console.log('mangodb connected successfull'))
//     .catch(err=>console.log(err));

app.get('/' ,function(req,res){
    res.send('<h1> Hello server  connected');
})

app.use('/API/auth',auth);
app.use('/API/questions',questions);
app.use('/API/profile',profile);

var port=process.env.PORT||3000;
app.listen(port,()=>{
    console.log('server is running at the :300')
})