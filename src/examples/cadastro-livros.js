var http = require('http');

var configuracoes ={
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method:'post',
    headers :{
            'Accept':'application/json',
            'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(request){
    console.log(request.statusCode);
    request.on('data', function(body){
        console.log('Corpo:' + body);
    });
});

var produto = {
    titulo: '',
    descricao: 'Criando requisição via POST para cadastro de livro',
    preco: 100
};

client.end(JSON.stringify(produto));
