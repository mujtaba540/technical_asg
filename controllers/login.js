var dbService=require('../services/db_services')
const user_signIn = require('../models/User');
var crd_validator=require('../services/credentionals_validator');
const user_signUp = require('../models/User');
var jwt=require('jsonwebtoken')



module.exports={
    async signin_user(req,res){
        var user_obj=new user_signIn();
        user_obj=req.body;
        crd_validator.valid_signin(user_obj).then(valid=>{
            if(valid.error===undefined){
                dbService.user_signin(user_obj).then(data=>{
                    if(data){
                        var token=jwt.sign(user_obj,process.env.SEC_USER_KEY,{expiresIn:'30m'});
                        console.log("Sign-In success")
                        res.json({
                            "token":token,
                            "UserID":user_obj.UserID,
                            "msg_sc":"Sign-In Success",
                            "msg":""
                        })
                    }else{
                        console.log("No user Sign-In error")
                            res.json({
                                "msg":"No user Sign-In error"
                            })
                    }                  
                })
            }else{
                console.log("Bad credentials");
                res.json({
                    "msg":"Bad credentials"
                })
            }
        }).catch(err=>{
            console.log("Sign-In Error");
            res.json({
                "msg":"Sign-In Error"
            })
        })
    },

    async signup_user(req,res){
        var user_obj=new user_signUp();
        user_obj=req.body;
        crd_validator.valid_signup(user_obj).then(valid=>{
            if(valid.error===undefined){
                        crd_validator.ecrypt_pwd(user_obj.Password).then(encr=>{
                            user_obj.Password=encr;
                            
                            dbService.user_signUp(user_obj).then(stat=>{
                                if(stat){
                                    var token=jwt.sign(user_obj,process.env.SEC_USER_KEY,{expiresIn:'30m'})
                                    console.log("Sign-up Successful")
                                    res.json({
                                        "token":token,
                                        "UserID":user_obj.UserID,
                                        "msg_sc":"Sign-Up Success",
                                        "msg":""
                                    })
                                }else{
                                    console.log("sign-up ERROR")
                                    res.json({
                                        "msg":" sign-up error"
                                    })
                                }  
                            })  
                        })
            }else{
                console.log("Bad credentials")
                res.json({
                    "msg":"Bad credentials"
                })
            }
        }).catch(err=>{
            console.log("SignUp Error")
            res.json({
                "msg":"SignUp Error"
            })
        })
       
    }
}