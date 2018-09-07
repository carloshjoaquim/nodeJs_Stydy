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

    app.use(function(req, res, next){
       res.status(404).render('erros/404'); 
       next();
    });   

    app.use(function(error, req, res, next){
        if(process.env.NODE_ENV == 'production'){
            res.status(500).render('erros/500'); 
            return;        
        }
        next(error);
     });

    return app;
}


