const { response } = require('express');
var jwt= require('jsonwebtoken');
var employee=require('../models/employee')

module.exports={
    getToken(req,res,next){
        var token_test=req.headers["authorization"];
        if(token_test!==undefined){
            var half=token_test.split(' ')[1];
            req.token=half;
            next();
        }else{
            console.log("No TOKEN")
            res.json({
                "msg":"NO TOKEN"
            })
        }
    },
    async add(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,add_emp)=>{
            if(err){
                res.json({
                    msg:"Not a valid user to proceed"
                })
            }else{
                var rmp=req.body.UserID;
                console.log(rmp)
                res.json({
                    rmp
                })

            }
        })
        
        
        
    }
}