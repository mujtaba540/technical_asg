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
    async addEmp(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,key)=>{
            if(err){
                res.json({
                    msg:"Not a valid user to proceed"
                })
            }else{
                var emp=req.body;
                emp.UserID=key.UserID;
                crd_val.valid_emp(emp).then(emp_next=>{
                    if(emp_next.error===undefined){
                        console.log(emp.CreatedOn)
                        console.log(emp.CreatedOn)
                        db_services.employee_add(emp).then(data=>{
                            if(data){
                                console.log("Employee Added")
                                res.json({
                                    "msg_sc":"Employee Added",
                                    "msg":""
                                })
                            }else{
                                console.log("Error while adding employee")
                                res.json({
                                    "msg":"Error while adding employee"
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
                    console.log(err)
                    console.log("ADD error")
                        res.json({
                            "msg":"EMPLOYEE NOT ADDED"
                        })
                })
            }
        })  
    },
    async deleteEmp(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,dltEmp)=>{
            if(err){
                console.log("Not a valid user to Delete EMPLOYEE")
                res.json({
                    "msg":"Not a valid user to Delete EMPLOYEE"
                })
            }else{
                var emp_id=req.query.id;
                var user_id=dltEmp.UserID;
                db_services.emp_dlt(emp_id,user_id).then(data=>{
                    if(data){
                        console.log("Employee Deleted Successfully")
                        res.json({
                            msg:"",
                            "msg_sc":"Employee Deleted Successfully"
                        })
                    }else{
                        console.log("NO such employee or anyother Delete error")
                        res.json({
                            "msg":"NO such employee or anyother Delete error"
                        })
                    }
                    
                }).catch(err=>{
                    console.log("Delete error")
                    res.json({
                        "msg":"Delete error"
                    })
                })   
            }
        })
    },
    async updateEmp(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,data)=>{
            if(err){
                console.log("Invalid User")
                res.json({
                    "msg":"Invalid User"
                })
            }else{
                var emp=req.body;
                emp.UserID=data.UserID;
                var eid=req.query.id;
                crd_val.update_emp(emp).then(emp_next=>{
                    if(emp_next.error===undefined){
                       
                        db_services.emp_updt(emp,eid).then(data=>{
                            if(data){
                                console.log("Employee Updated")
                                res.json({
                                    "msg_sc":"Employee Updated",
                                    "msg":""
                                })
                            }else{
                                console.log("Employee not Updated or Employee with this id doesnot exsist")
                                res.json({
                                    "msg":"Employee not Updated or Employee with this id doesnot exsist"
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
                    console.log("Updated error")
                        res.json({
                            "msg":"Error: EMPLOYEE NOT Updated"
                        })
                })
            }
    })
    },

    async getAllEmp(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,key)=>{
            if(err){
                console.log("Not valid User to request Employee")
                res.json({
                    "msg":"Not valid User to request Employee"
                })
            }else{
                var user_id=key.UserID;
                db_services.all_emp(user_id).then(data=>{
                    if(data){
                        console.log("All employees for User")
                        res.json({
                            data,
                            "msg_sc":"All employees for User",
                            "msg":""

                        })
                    }else{
                        console.log("NO employee for User")
                        res.json({    
                            "msg":"NO employee for User",
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                })
                

            }
    })
    },
    
    async getEmpId(req,res){
        jwt.verify(req.token,process.env.SEC_USER_KEY,(err,key)=>{
            if(err){
                console.log("Not a valid User to proceed")
                res.json({
                    "msg":"Not a valid user to proceed"
                })
            }else{
                var emp_id=req.query.id;
                var user_id=key.UserID;
                db_services.getEmp_id(emp_id,user_id).then(data=>{
                    if(data){
                        console.log("Employee found")
                        res.json({
                            data,
                            msg_sc:"Employee found",
                            msg:""
                        })
                    }else{
                        console.log("No Employee with such id exsist")
                        res.json({
                            msg:"No Employee with such id exsist"
                        })
                    }
                }).catch(err=>{

                })
            }
        })
    }


}