const JwtStrategy=require('passport-jwt').JwtStrategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const mongoose=require('mangoose');
const Person=require('../models/Person')


var opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();

//opts.secretOrkey=mykey.secret;

module.exports=passport=>{
    passport.use(
        new JwtStrategy(opts,(jwt_payload,load)=>{
            Person.findById(jwt_payload.id)
            .then(person=>{
                if(person){
                  return done(null,person);
                }
                return done(null,false);
            })
            .catch(err=>console.log(err));
        })
    )
}