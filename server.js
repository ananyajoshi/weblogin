const express = require("express");
const bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

app.use(bodyParser.json());



var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'USERS',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed' + JSON.stringify(err, undefined, 2));

});



//username and password
app.post("/web/chk",(req,res)=>{

   
    console.log(req.body);
    let usrNm  = req.body.usrNm;  
    let pwd = req.body.pwd;

    
    let sql = `select PASSWORD FROM admin_table WHERE USER_NAME = ?`;
    
    let values = [usrNm];
    mysqlConnection.query(sql,values,(err,result)=>{
        if(err) throw err;
        console.log(result);
        console.log("checking password for "+usrNm);
        console.log(pwd);
          if(result[0].PASSWORD==pwd){
              res.status(200).send({verification : 'Verified'})
          }else{
              res.status(200).send({verification : 'Not Verified'})
          }
      });     
}); 


app.listen(3000, () => console.log('Server running at port no:3000'));