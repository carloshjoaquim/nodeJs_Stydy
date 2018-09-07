module.exports = function(app){

    app.get('/promocoes/form', function(req, res){
     const connection = app.infra.ConnectionFactory();
     const produtosBanco = new app.infra.ProdutosDAO(connection);
      
     produtosBanco.lista(function(error, resultados){
             res.render('promocoes/formPromocoes', {lista:resultados});
     });
         connection.end();
     });

     app.post("/promocoes", function(req, res){
        const promocao = req.body;
        app.get('io').emit('novaPromocao', promocao);
        res.redirect('promocoes/form');
     });

 };