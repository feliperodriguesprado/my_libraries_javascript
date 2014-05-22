var BibliotecaControle = {

	inicializar: function() {
        ConexaoBancoDados.abrirBancoDados(function() {
            BibliotecaDAO.listarBibliotecas();
        });
        document.getElementById("nome").focus();
        BibliotecaControle.formularioBiblioteca();
        BibliotecaControle.botaoSalvar();
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
                var classificacao = document.getElementById("classificacao");
                var desejado = document.getElementById("desejado");

                if (nome.value != "" && tipo.value != "" && tipo.value != "0" && classificacao.value != "" && classificacao.value != "0") {
                	
                	if (bibliotecaId.value == "") {
	                	var biblioteca = {tipo: tipo.value, usuarioid: null, nome: nome.value, classificacao: classificacao.value, desejado: desejado.checked};
	                	BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca) {
	            			if (sessao) {
	            				biblioteca.usuarioid = sessao.value.usuarioid;
	            				BibliotecaDAO.cadastrarBiblioteca(biblioteca);
	            			};
	            		});                		
                	} else {
                		var biblioteca = {bibliotecaid: bibliotecaId.value, tipo: tipo.value, usuarioid: null, nome: nome.value, classificacao: classificacao.value, desejado: desejado.checked};
                		BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca) {
                			if (sessao) {
                				biblioteca.usuarioid = sessao.value.usuarioid;
                				BibliotecaDAO.alterarBiblioteca(biblioteca);
	            			};
						});
                	};

                } else {
                	document.getElementById("painelAvisos").innerHTML = "<div id = \"painelAvisos\"> <span id = \"avisoTipoClassificacao\">Informe corretamente os campos acima</span></div>";
                    window.setTimeout( function() {
                    document.getElementById("painelAvisos").innerHTML = "";
                    document.getElementById("nome").focus();
                } , 3000
            );
                } ;

            }
        );
    },

    botaoEditar: function(bibliotecaid) {
    	BibliotecaDAO.buscaBibliotecaPorPrimaryKey(bibliotecaid, function(biblioteca) {
    		BibliotecaControle.exibirDadosBibliotecaParaAlteracao(biblioteca);
    	});
    },

    exibirDadosBibliotecaParaAlteracao: function (biblioteca) {
    	document.getElementById("bibliotecaId").value = biblioteca.primaryKey;
    	document.getElementById("nome").value = biblioteca.value.nome;
        document.getElementById("tipo").value = biblioteca.value.tipo;
        document.getElementById("classificacao").value = biblioteca.value.classificacao;
        document.getElementById("desejado").checked = biblioteca.value.desejado;
    },


    botaoExcluir: function(bibliotecaid) {
    	BibliotecaDAO.excluirBiblioteca(bibliotecaid);
    }
};

BibliotecaControle.inicializar();