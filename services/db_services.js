var bcrypt=require('bcrypt');
var {Client}=require('pg')

var config={
    user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'root',
  port: 5432,
}



module.exports={
    async user_signin(user){
        try{
            var connection= await mysql_await.createConnection(config);
            var data = await connection.awaitQuery(`Select Password,UserID,FirstName from internship.user where Username=?;`,[
                    user.Username,
                ]);
                if(data){
                    var result=await bcrypt.compare(user.Password,data[0]["Password"])
                    if(result){
                        user.UserID=data[0]["UserID"];
                        user.FirstName=data[0]["FirstName"]
                        return true;
                    }else{
                        return false
                    }
            }else{
                    return false;
                }
        }catch(err){
            return false;
        }
    },

    async user_signUp(user){
        try{
            var client=new Client(config);
            await client.connect();
            const result=await client.query(`Insert into internship.user (firstname,lastname,username,address,phonenumber,createdby,createdon,password)
            values ($1,$2,$3,$4,$5,$6,$7,$8) returning UserID`,[user.FirstName,user.LastName,user.Username,user.Address,user.PhoneNumber,user.CreatedBy,user.CreatedOn,user.Password])
            user.UserID=result.rows[0]["userid"];
            return true
        }catch(err){
            console.log(err)
            return false;
        }
        
    },

    async employee_add(emp){
        try{
            var connection= await mysql_await.createConnection(config);
            var data = await connection.awaitQuery(`Insert into internship.employee (UserID,Name,Email,Age,Designation,Gender,DateOfBirth,CreatedBy,CreatedOn)
                values (?,?,?,?,?,?,?,?,?);`,[
                    emp.UserID,
                    emp.Name,
                    emp.Email,
                    emp.Age,
                    emp.Designation,
                    emp.Gender,
                    emp.DateOfBirth,
                    emp.CreatedBy,
                    emp.CreatedOn
                ]);
                if(data){
                    return true;
            }else{
                    return false;
                }
        }catch(err){
            return false;
        }
    },

    async emp_dlt(emp_id,user_id){
        try{
            var connection= await mysql_await.createConnection(config);
            var data = await connection.awaitQuery(`Update internship.employee 
            set IsDeleted=1
            where UserID=? and EmpID=? and IsDeleted=0`,[
                user_id,
                emp_id
                ]);
                if(data["affectedRows"]>0){
                    return true;
            }else{
                    return false;
                }
        }catch(err){
            console.log(err)
            return false;
        }
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("empid",mssql.Int,emp_id)
            .input("userid",mssql.Int,user_id)
            .query(`Update Employee 
            set IsDeleted='true'
            where EmpID=@empid and UserID=@userid and IsDeleted='false'`)
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err);
            return false;
        }
        
    },

    async emp_updt(emp,empid){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("eid",mssql.Int,empid)
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
            .query(`Update Employee
            set UserID=@uid,Name=@name,Email=@email,Age=@age,Designation=@desg,Gender=@gender,DateOfBirth=@dob,IsActive=@active,IsDeleted=@delete,CreatedBy=@crtBy,CreatedOn=@crtOn,UpdatedBy=@updBy,UpdatedOn=@updOn
            where EmpID=@eid and IsDeleted='false'`)
            if(data.rowsAffected>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err)
            console.log("error on Updating EMPLOYE")
            return false;
        }
    },

    async all_emp(user_id){
        try{
            var connection= await mysql_await.createConnection(config);
            var data = await connection.awaitQuery(`Select * from internship.employee 
                where UserID=? and isDeleted=0`,[
                    user_id
                ]);
                if(data){
                    return data;
            }else{
                    return false;
                }
        }catch(err){
            console.log(err)
            return false;
        }
    
    },

    async getEmp_id(empid,userid){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("empid",mssql.Int,empid)
            .input("uid",mssql.Int,userid)
            .query(`Select * from Employee where UserID=@uid and EmpID=@empid and IsDeleted='false'`)
            if(data.rowsAffected>0){
                return data.recordset;
            }else{
                return false;
            }
        }catch(err){
            console.log("Error On fetching");
            return false;
        }
    },

    async userData(uid){
        try{
            var connection= await mssql.connect(config);
            var data=await connection.request()
            .input("uid",mssql.Int,uid)
            .query("Select * from [User] where UserID=@uid")
            if(data.rowsAffected>0){
                return data.recordset
            }else{
                return false;
            }

        }catch(err){
            console.log("Error on User Data function")
            return false;
        }
    }
}