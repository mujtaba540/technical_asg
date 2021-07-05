var express=require('express');
var router=require("./routes/routes")
var bodyParser=require('body-parser')
var cors=require('cors')
require('dotenv').config()

var app=express();
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(3000)
console.log('at 3000')
