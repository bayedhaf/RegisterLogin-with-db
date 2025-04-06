const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jsonwn=require('jsonwebtoken')
const passport=require('passport');

//@type GET
//@route /api/auth
//@desc just for testing
//@access public

router.get('/',(req,res)=>{
    res.json({user:'The router is successfull'});
})
//import schema fro person to register
const Person=require('../../models/Person')
//@type post
//@route /api/auth/register 
//@desc just for testing
//@access public
router.post('/register',(req,res)=>{
    Person.findOne({email: req.body.email})
          .then(person=>{
                if(person){
                return res.status(400)
                .json({emailerror:'Email is already register in system.PLease try login....?'})
               }
            else{
                   
                    const  newPerson=new Person({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password
                    });
                    //encypt password using bcrypt
                        bcrypt.genSalt(10, (err, salt)=> {
                        bcrypt.hash(newPerson.password, salt,(err, hash) =>{
                            if(err) throw err;
                            newPerson.password=hash;
                            newPerson
                                .save()
                                .then(person=>res.json(person))
                                .catch(err=>console.log(err));
                         
                        });
                    });
                   
            }
        })
        .catch(err=>console.log(err));
})
//@type post
//@route /api/auth/login
//@desc just for testing
//@access public
router.post('/login',(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
      Person.findOne({email})
             .then(person=>{
                if (!person) {
                    return res.status(404)
                       .json({emailerror:'This user is not found.Please try as Regestiry...'})
                    
                } 
                //login test
                bcrypt.compare(password,person.password)
                        .then(isCorrect=>{
                            if(isCorrect){
                                res.json({sucess:'Login is succeully'})
                            //use payload adn create token for user
                            
                            }
                            else{
                                res.status(400).json({passworderror:'Password is not correct'})
                            }
                        })

                        .catch(err=>console.log(err));
                  
             })
             .catch(err=>console.log(err))
})




module.exports=router;