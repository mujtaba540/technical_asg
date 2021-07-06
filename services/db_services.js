var mssql=require('mssql');
const user_signUp = require('../models/User');
const credentionals_validator = require('./credentionals_validator');
var bcrypt=require('bcrypt')


var config={
        user:'db_a7667a_mujtaba6099_admin',
        password:'5115814P@k',
        database:'db_a7667a_mujtaba6099',
        server:'SQL5053.site4now.net',
        port:1433,
        options:{
            trustServerCertificate:true
        }
}

module.exports={
    async user_signin(user){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input('Username',mssql.NVarChar,user.Username)
            .query("Select Password,UserID from [User] where Username=@Username")
            if(data.rowsAffected>0){
               var result=await bcrypt.compare(user.Password,data.recordset[0]["Password"])
               if(result){
                user.UserID=data.recordset[0]["UserID"]
                return true;
               }else{
                   return false
               }
                      
                
            }else{
                return false;
            }

        }catch(err){
            console.log(err)
            return false;
        }
    },

    async user_signUp(user){
        try{
            if(user.UpdatedOn===""){
                user.UpdatedOn=null
            }
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("fname",mssql.NVarChar,user.FirstName)
            .input("lname",mssql.NVarChar,user.LastName)
            .input("username",mssql.NVarChar,user.Username)
            .input("pwd",mssql.NVarChar,user.Password)
            .input("phone",mssql.NVarChar,user.PhoneNumber)
            .input("adrs",mssql.NVarChar,user.Address)
            .input("act",mssql.NVarChar,user.IsActive)
            .input("dlt",mssql.NVarChar,user.IsDeleted)
            .input("crtBy",mssql.NVarChar,user.CreatedBy)
            .input("crtOn",mssql.DateTime,user.CreatedOn)
            .input("updBy",mssql.NVarChar,user.UpdatedBy)
            .input("updOn",mssql.DateTime,user.UpdatedOn)
            .query(`Insert into [User] (FirstName,LastName,Username,Address,PhoneNumber,IsActive,IsDeleted,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn,Password)
            values (@fname,@lname,@username,@adrs,@phone,@act,@dlt,@crtBy,@crtOn,@updBy,@updOn,@pwd); select SCOPE_IDENTITY();`)
            if(data.rowsAffected[0]>0){
                user.UserID=data.recordset[0]['']
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err)
            return false
        }
    },

    async emp_add(emp){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("uid",mssql.Int,emp.UserID)
            .input("name",mssql.NVarChar,emp.Name)
            .input("email",mssql.NVarChar,emp.Email)
            .input("age",mssql.Int,emp.Age)
            .input("desg",mssql.NVarChar,emp.Designation)
            .input("gender",mssql.NVarChar,emp.Gender)
            .input("dob",mssql.DateTime,emp.DateOfBirth)
            .input("active",mssql.Bit,emp.IsActive)
            .input("delete",mssql.Bit,emp.IsDeleted)
            .input("crtBy",mssql.NVarChar,emp.CreatedBy)
            .input("crtOn",mssql.DateTime,emp.CreatedOn)
            .input("updBy",mssql.NVarChar,emp.UpdatedBy)
            .input("updOn",mssql.DateTime,emp.UpdatedOn)
            .query(`Insert into Employee (UserID,Name,Email,Age,Designation,Gender,DateOfBirth,IsActive,IsDeleted,CreatedBy,CreatedOn,UpdatedBy,UpdatedOn)
            values (@uid,@name,@email,@age,@desg,@gender,@dob,@active,@delete,@crtBy,@crtOn,@updBy,@updOn)`)
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err)
            console.log("error on ADDING EMPLOYE")
            return false;
        }
    },

    async emp_dlt(emp_id,user_id){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("empid",mssql.Int,emp_id)
            .input("userid",mssql.Int,user_id)
            .query(`Update Employee 
            set IsDeleted='true'
            where EmpID=@empid and UserID=@userid`)
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
        
    }
}