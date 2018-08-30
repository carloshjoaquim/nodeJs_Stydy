
module.exports = function(app){

    app.get('/',function(request, response){
        response.render("home/home");
    });

    app.get('/produtos',function(request, response){
        var connection = app.infra.ConnectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
         
       produtosBanco.lista(function(error, result){
            response.render('produtos/lista', {lista:result});
        });

        connection.end();
    });

    app.get('/produtos/remove',function(){
        var connection = app.infra.ConnectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
         
        var produto = produtosBanco.carrega(id, callback);
        if(produto)
        {
            produtosBanco.remove(produto, callback);
        }

        connection.end();
    });

}
