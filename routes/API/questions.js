const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.json({questions:'profile is successfill created'})
})

module.exports=router;