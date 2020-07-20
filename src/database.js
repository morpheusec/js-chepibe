const mysql = require('mysql');
const mysqlConnection= mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'amorcito',
        database:'chepibe'

    }
);
mysqlConnection.connect( function(err){
    if (err){
        console.log(err);
        //console.error('error connecting: ' + err.stack);
        return;
    }else{
       console.log('bd in conected');
       //console.log('connected as id ' + connection.threadId);
    }

});

module.exports= mysqlConnection;