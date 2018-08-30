var mysql = require('mysql');

function createDbConnection(){    
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'Produtos'
    });
}

//wrapper
module.exports = function(){
    return createDbConnection;
}