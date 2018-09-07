
module.exports = function(app){

    app.get('/produtos',function(request, response, next){
        const connection = app.infra.ConnectionFactory();
        const produtosBanco = new app.infra.ProdutosDAO(connection);
         
       produtosBanco.lista(function(error, result){
            if(error){
                return next(error);
            }
            
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
        response.render('produtos/form', {errosValidacao: {}, produto:{}});
    });

    app.post('/produtos', function(request, response){
        const produto = request.body;   
        
        request.assert('titulo', 'Título é obrigatório').notEmpty();
        request.assert('preco', 'Formato do preço inválido').isFloat();
        

        var erros = request.validationErrors();

        if(erros)
        {
            response.format({
                html: function(){
                    response.status(400).render('produtos/form', {errosValidacao: erros, produto: produto});           
                },
                json: function(){
                    response.status(400).json(erros);                    
            }   
            });     
            return;           
        }

        const connection = app.infra.ConnectionFactory();
        const produtosDao= new app.infra.ProdutosDAO(connection);

        produtosDao.salva(produto, function(erros, resultados){
            response.redirect('/produtos');
        });

    });

}
