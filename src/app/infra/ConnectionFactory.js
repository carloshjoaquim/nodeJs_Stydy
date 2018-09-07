const mysql = require('mysql');

const connectMYSQL = function createDbConnection(){  
    if(!process.env.NODE_ENV || process.env.node === 'dev')
    {  
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'Produtoss'
        });
    }

    if(process.env.NODE_ENV == 'test')
    {  
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'Produtos_test'
        });
    }
};

//wrapper
module.exports = function(){
    return connectMYSQL;
}