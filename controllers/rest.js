var jwt= require('jsonwebtoken');
var employee=require('../models/employee');
const db_services = require('../services/db_services');
var crd_val=require("../services/credentionals_validator")

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
                var emp=req.body;
                emp.UserID=add_emp.UserID;
                crd_val.valid_emp(emp).then(emp_next=>{
                    if(emp_next.error===undefined){
                        db_services.emp_add(emp).then(data=>{
                            if(data){
                                console.log("Employee Added")
                                res.json({
                                    "msg":"Employee Added"
                                })
                            }else{
                                console.log("Employee not added")
                                res.json({
                                    "msg":"Employee not added"
                                })
                            }
                        })
                    }else{
                        console.log("Bad credentials")
                        console.log(emp_next.error)
                        res.json({
                            "msg":"Bad credentials"
                        })
                    }

                }).catch(err=>{
                    console.log("ADD error")
                        res.json({
                            "msg":"EMPLOYEE NOT ADDED"
                        })
                })
            }
        })  
    }
}