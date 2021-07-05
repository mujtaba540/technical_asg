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
            user=credentionals_validator.set_user(user);
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
            .query(`Insert into [User] (FirstName,LastName,Username,Address,PhoneNumber,IsActive,IsDeleted,CreatedBy,CreatedOn,UpdatedBy,Password)
            values (@fname,@lname,@username,@adrs,@phone,@act,@dlt,@crtBy,@crtOn,@updBy,@pwd); select SCOPE_IDENTITY();`)
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

    async check_email(user){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input('Username',mssql.NVarChar,user.Username)
            .query("Select * from [User] where Username=@Username")
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err)
            return false;
        }
    }
}