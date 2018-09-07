const express = require('../config/express')();
const request = require('supertest')(express);

describe('#ProdutosController', function(){

        beforeEach(function(done){
            const conn = express.infra.ConnectionFactory();
            conn.query("delete from livros", function(ex, result){
                if(!ex)
                    done();
            });
        });

        it('#Listagem Json', function(done){
           
            request.get('/produtos')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);            
        
        });

        it('#Cadastro de Produto com dados Inválidos', function(done){
            request.post('/produtos')
                .send({titulo:"", descicao: "Livro Teste"})
                .expect(400, done);
        });

        it('#Cadastro de Produto com dados Válidos', function(done){
            request.post('/produtos')
                .send({titulo: "Titulo Teste", descicao: "Livro Teste", preco: 100.00})
                .expect(302, done);
        });

});

