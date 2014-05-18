var BibliotecaControle = {

	inicializar: function() {
        window.setTimeout( function() {
        		document.getElementById("nome").focus();
        		BibliotecaControle.formularioBiblioteca();
        		BibliotecaControle.botaoSalvar();
                ConexaoBancoDados.abrirBancoDados(function() {
                	BibliotecaDAO.listarBibliotecas();
                });
            } , 0000
        );
    },

    formularioBiblioteca: function() {

        // Desabilitando o envio do submit
        var formularioBiblioteca = document.getElementById("formularioBiblioteca");
        
        if (formularioBiblioteca) {
            formularioBiblioteca.onsubmit = function(event) {
                return false;
              }
        };
    },

    botaoSalvar: function() {

    	var botaoSalvar = document.getElementById("botaoSalvar");
    	botaoSalvar.addEventListener("click", function() {
                
                var bibliotecaId = document.getElementById("bibliotecaId");
                var nome = document.getElementById("nome");
                var tipo = document.getElementById("tipo");

                if (nome.value != "" && tipo.value != "" && tipo.value != "0") {
                	
                	if (bibliotecaId.value == "") {
	                	var biblioteca = {tipo: tipo.value, usuarioid: null, nome: nome.value};
	                	BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca/*, callback2*/) {
	            			if (sessao) {
	            				biblioteca.usuarioid = sessao.value.usuarioid;
	            				BibliotecaDAO.cadastrarBiblioteca(biblioteca);	
	                			//BibliotecaDAO.buscaUsuarioPorPrimaryKey(sessao.value.usuarioid, biblioteca, callback2);
	            			};
	            		}/*, function (callback1, usuario) {
	            			BibliotecaDAO.cadastrarBiblioteca(callback1, usuario);
	            		}*/);                		
                	} else {
                		var biblioteca = {bibliotecaid: bibliotecaId.value, tipo: tipo.value, usuarioid: null, nome: nome.value};
                		BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca) {
                			if (sessao) {
                				biblioteca.usuarioid = sessao.value.usuarioid;
                				BibliotecaDAO.alterarBiblioteca(biblioteca);
	            			};
						});
                	};

                } else {
                	alert("Informe um tipo válido");
                } ;

            }
        );
    },

    botaoEditar: function(bibliotecaid) {
    	console.log(bibliotecaid);

    	BibliotecaDAO.buscaBibliotecaPorPrimaryKey(bibliotecaid, function(biblioteca) {
    		BibliotecaControle.exibirDadosBibliotecaParaAlteracao(biblioteca);
    	});
    },

    exibirDadosBibliotecaParaAlteracao: function (biblioteca) {
    	document.getElementById("bibliotecaId").value = biblioteca.primaryKey;
    	document.getElementById("nome").value = biblioteca.value.nome;
        document.getElementById("tipo").value = biblioteca.value.tipo;
    },


    botaoExcluir: function(bibliotecaid) {
    	console.log(bibliotecaid);
    }
};

BibliotecaControle.inicializar();