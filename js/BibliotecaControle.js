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
                document.getElementById("dadosTabelaLivros").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                    "<td colspan = \"3\">" +
                        "<input class = \"inputBibliotecaDesejada\" type = \"checkbox\" disabled " + desejado + ">" +
                    "<td colspan = \"4\">" +
                        "<button class = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                        "<a href=\"#confirmacao\" class = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</a>" +
                    "</td>" +
                "</tr>";
        };

        if (biblioteca.value.tipo == 2) {
                document.getElementById("dadosTabelaMusicas").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                    "<td colspan = \"3\">" +
                        "<input class = \"inputBibliotecaDesejada\" type = \"checkbox\" disabled " + desejado + ">" +
                    "<td colspan = \"4\">" +
                        "<button class = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                        "<a href=\"#confirmacao\" class = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</a>" +
                    "</td>" +
                "</tr>";
        };

        if (biblioteca.value.tipo == 3) {
                document.getElementById("dadosTabelaVideos").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                    "<td colspan = \"3\">" +
                        "<input class = \"inputBibliotecaDesejada\" type = \"checkbox\" disabled " + desejado + ">" +
                    "<td colspan = \"4\">" +
                        "<button class = \"botaoEditar\" type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                        "<a href=\"#confirmacao\" class = \"botaoExcluir\" type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</a>" +
                    "</td>" +
                "</tr>";
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
                	
                    document.getElementById("tituloFormulario").innerHTML = "Cadastrar biblioteca";
                    document.getElementById("painelBotaoCancelar").innerHTML = "";
                    painelFormulario.style.border = "1px solid #bdbdbd";

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
                	document.getElementById("painelAvisos").innerHTML = "<div id = \"avisoCamposIncorretos\"> <span id = \"camposIncorretos\">Informe corretamente os campos acima</span></div>";
                    window.setTimeout( function() {
                    document.getElementById("painelAvisos").innerHTML = "";
                } , 5000
            );
                } ;

            }
        );
    },

    botaoEditar: function(bibliotecaid) {

        scroll(0,0);
        
        var nodes = document.getElementById("painelTabela").getElementsByTagName('*');
        for(var i = 0; i < nodes.length; i++) {
            nodes[i].disabled = true;
        };

        document.getElementById("painelBotaoCancelar").innerHTML += 
        "<button id = \"botaoCancelar\" class = \"botao\" type=\"button\">Cancelar</button>";

        document.getElementById("tituloFormulario").innerHTML = "Alterar biblioteca";
        painelFormulario.style.border = "1px solid red";

    	BibliotecaDAO.buscaBibliotecaPorPrimaryKey(bibliotecaid, function(biblioteca) {
    		BibliotecaControle.exibirDadosBibliotecaParaAlteracao(biblioteca);
    	});

        var botaoCancelar = document.getElementById("botaoCancelar");
        botaoCancelar.addEventListener("click", function() {
            document.getElementById("tituloFormulario").innerHTML = "Cadastrar biblioteca";
            document.getElementById("painelBotaoCancelar").innerHTML = "";
            document.getElementById("nome").value = "";
            document.getElementById("tipo").value = "0";
            document.getElementById("classificacao").value = "0";
            document.getElementById("desejado").checked = false;
            document.getElementById("nome").focus();
            painelFormulario.style.border = "1px solid #bdbdbd";
            document.getElementById("dadosTabelaVideos").innerHTML = "";
            document.getElementById("dadosTabelaLivros").innerHTML = "";
            document.getElementById("dadosTabelaMusicas").innerHTML = "";
            BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                BibliotecaControle.listarBibliotecas(biblioteca);
            });
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

        document.getElementById("painelConfirmacaoExcluirBiblioteca").innerHTML =
        
        "<div id = \"confirmacao\" class = \"modalConfirmacao\">" +
            "<div>" +
                "<label>Tem certeza que deseja excluir essa biblioteca?</label>" +
                "<div id = \"painelBotoesConfirmacao\">" + 
                    "<button id = \"botaoConfirmacaoSim\" class = \"botaoConfirmacao\" type = \"button\">Sim</button>" +
                    "<button id = \"botaoConfirmacaoNao\" class = \"botaoConfirmacao\" type = \"button\">Não</button>" +
                "</div>" +
            "</div>"
        "</div>";

        botaoSim = document.getElementById("botaoConfirmacaoSim");
        botaoNao = document.getElementById("botaoConfirmacaoNao");

        botaoSim.addEventListener("click", function(){
            document.getElementById("painelConfirmacaoExcluirBiblioteca").innerHTML = "";
            
            document.getElementById("dadosTabelaVideos").innerHTML = "";
            document.getElementById("dadosTabelaLivros").innerHTML = "";
            document.getElementById("dadosTabelaMusicas").innerHTML = "";
            BibliotecaDAO.excluirBiblioteca(bibliotecaid);
        });

        botaoNao.addEventListener("click", function(){
            document.getElementById("painelConfirmacaoExcluirBiblioteca").innerHTML = "";
        });
    }
};

BibliotecaControle.inicializar();