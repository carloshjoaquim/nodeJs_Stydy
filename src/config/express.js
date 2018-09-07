var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');



module.exports = function() {        
    var app = express();

    app.set('view engine', 'ejs'); // Setando variáveis para o express.
    app.set('views', './app/views'); // Setando pasta padrão para views.   
    app.use(express.static('./app/public/'));

    //Middleware
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    //

    load('infra', {cwd: 'app'})
        .then('routes')
        .into(app);

    return app;
}


