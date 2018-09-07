module.exports = function(app){

   app.get('/', function(req, res){
    const connection = app.infra.ConnectionFactory();
    const produtosBanco = new app.infra.ProdutosDAO(connection);
     
    produtosBanco.lista(function(error, resultados){
            res.render('home/index', {livros:resultados});
    });
        connection.end();
    });
};