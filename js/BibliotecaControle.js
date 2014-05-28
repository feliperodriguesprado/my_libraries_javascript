var BibliotecaControle = {

	inicializar: function() {
        document.getElementById("dadosTabelaVideos").innerHTML = "";
        document.getElementById("dadosTabelaLivros").innerHTML = "";
        document.getElementById("dadosTabelaMusicas").innerHTML = "";
        document.getElementById("nome").focus();
        ConexaoBancoDados.abrirBancoDados(function() {
            BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                BibliotecaControle.listarBibliotecas(biblioteca);
            });
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

    listarBibliotecas: function(biblioteca) {

        var classificacao = null;
        var desejado = null;
                
        switch(biblioteca.value.classificacao) {
                case "0":
                classificacao = "Não classificado";
                break;
                case "1":
                classificacao = "Exelente";
                break;
                case "2":
                classificacao = "Muito bom";
                break;
                case "3":
                classificacao = "Bom";
                break;
                case "4":
                classificacao = "Regular";
                break;
                case "5":
                classificacao = "Ruim";
                break;
        };

        switch(biblioteca.value.desejado) {
                case true:
                desejado = "checked = \"true\"";
                break;
                case false:
                desejado = "";
        };

        if (biblioteca.value.tipo == 1) {
                document.getElementById("dadosTabelaLivros").innerHTML += "<tr>" +
                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                "<td colspan = \"2\">" + classificacao +"</td>" +
                "<td colspan = \"3\">" +
                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                "<td colspan = \"4\">" +
                    "<button id = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                    "<button id = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                "</td></tr>";
        };

        if (biblioteca.value.tipo == 2) {
                document.getElementById("dadosTabelaMusicas").innerHTML += "<tr>" +
                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                "<td colspan = \"2\">" + classificacao +"</td>" +
                "<td colspan = \"3\">" +
                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                "<td colspan = \"4\">" +
                    "<button id = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                    "<button id = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                "</td></tr>";
        };

        if (biblioteca.value.tipo == 3) {
                document.getElementById("dadosTabelaVideos").innerHTML += "<tr>" +
                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                "<td colspan = \"2\">" + classificacao +"</td>" +
                "<td colspan = \"3\">" +
                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                "<td colspan = \"4\">" +
                    "<button id = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                    "<button id = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                "</td></tr>";
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

                if (nome.value != "" && tipo.value != "" && tipo.value != "0" && classificacao.value != "") {
                	
                	if (bibliotecaId.value == "") {
	                	document.getElementById("dadosTabelaVideos").innerHTML = "";
                        document.getElementById("dadosTabelaLivros").innerHTML = "";
                        document.getElementById("dadosTabelaMusicas").innerHTML = "";
                        var biblioteca = {tipo: tipo.value, usuarioid: null, nome: nome.value, classificacao: classificacao.value, desejado: desejado.checked};
	                	BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca) {
	            			if (sessao) {
	            				biblioteca.usuarioid = sessao.value.usuarioid;
	            				BibliotecaDAO.cadastrarBiblioteca(biblioteca);
	            			};
	            		});                		
                	} else {
                        document.getElementById("dadosTabelaVideos").innerHTML = "";
                        document.getElementById("dadosTabelaLivros").innerHTML = "";
                        document.getElementById("dadosTabelaMusicas").innerHTML = "";
                		var biblioteca = {bibliotecaid: bibliotecaId.value, tipo: tipo.value, usuarioid: null, nome: nome.value, classificacao: classificacao.value, desejado: desejado.checked};
                		BibliotecaDAO.obterSessao(biblioteca, function(sessao, biblioteca) {
                			if (sessao) {
                				biblioteca.usuarioid = sessao.value.usuarioid;
                				BibliotecaDAO.alterarBiblioteca(biblioteca);
	            			};
						});
                	};

                } else {
                	document.getElementById("painelAvisos").innerHTML = "<div id = \"painelAvisos\"> <span id = \"avisoCamposIncorretos\">Informe corretamente os campos acima</span></div>";
                    window.setTimeout( function() {
                    document.getElementById("painelAvisos").innerHTML = "";
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
        document.getElementById("dadosTabelaVideos").innerHTML = "";
        document.getElementById("dadosTabelaLivros").innerHTML = "";
        document.getElementById("dadosTabelaMusicas").innerHTML = "";
    	BibliotecaDAO.excluirBiblioteca(bibliotecaid);
    }
};

BibliotecaControle.inicializar();