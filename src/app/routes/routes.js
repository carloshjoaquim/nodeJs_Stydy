
module.exports = function(app){

    app.get('/',function(request, response){
        response.render("home/home");
    });

    app.get('/produtos',function(request, response){
        const connection = app.infra.ConnectionFactory();
        const produtosBanco = new app.infra.ProdutosDAO(connection);
         
       produtosBanco.lista(function(error, result){
        response.format({
            html: function(){
                response.render('produtos/lista',{lista:result});
            },
            json: function(){
                response.json(result)
            }
            });
        });
        connection.end();
    });

    app.get('/produtos/remove',function(){
        const connection = app.infra.ConnectionFactory();
        const produtosDao = new app.infra.ProdutosDAO(connection);
         
        const produto = produtosDao.carrega(id, callback);
        if(produto)
        {
            produtosDao.remove(produto, callback);
        }

        connection.end();
    });

    app.get('/produtos/form', function(request, response){
        response.render('produtos/form');
    });

    app.post('/produtos', function(request, response){
        const produto = request.body;    
        const connection = app.infra.ConnectionFactory();
        const produtosDao= new app.infra.ProdutosDAO(connection);

        produtosDao.salva(produto, function(erros, resultados){
            response.redirect('/produtos');
        });

    });

}
