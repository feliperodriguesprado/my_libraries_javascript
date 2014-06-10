var PrincipalControle = {

	numBibliotecaDesejadaLivros: 1,
	numBibliotecaDesejadaMusicas: 1,
	numBibliotecaDesejadaVideos: 1,

	inicializar: function() {
		window.setTimeout( function() {
                PrincipalControle.botaoSair();
				ConexaoBancoDados.abrirBancoDados(function() {
					BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                		PrincipalControle.listarMinhasBibliotecas(biblioteca);
            		});
            		BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                		PrincipalControle.listarBibliotecasDesejadas(biblioteca);
            		});
				});
            } , 0000
        );
	},

	botaoSair: function() {
		botaoSair = document.getElementById("botaoSair");

		botaoSair.addEventListener("click", function() {
				console.log("Usuario saiu.");
				UsuarioDAO.finalizarSessao();
            }
        );
	},

	obterSessaoUsuario: function() {
		UsuarioDAO.obterSessao(function(usuario) {
			PrincipalControle.exibirUsuarioTelaPrincipal(usuario);
		});
	},

	exibirUsuarioTelaPrincipal: function(usuario) {
		console.log(usuario.value.nome);

		document.getElementById("areaUsuario").innerHTML = "<span>Olá " + usuario.value.nome + "!</span>";
	},

	listarMinhasBibliotecas: function(biblioteca) {

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

        if (biblioteca.value.tipo == 1 && biblioteca.value.desejado == false && PrincipalControle.numBibliotecaDesejadaLivros <= 5) {
                document.getElementById("dadosTabelaLivros1").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
                PrincipalControle.numBibliotecaDesejadaLivros += 1;
        };

        if (biblioteca.value.tipo == 2 && biblioteca.value.desejado == false && PrincipalControle.numBibliotecaDesejadaMusicas <= 5) {
                document.getElementById("dadosTabelaMusicas1").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
                PrincipalControle.numBibliotecaDesejadaMusicas += 1;
        };

        if (biblioteca.value.tipo == 3 && biblioteca.value.desejado == false && PrincipalControle.numBibliotecaDesejadaVideos <= 5) {
                document.getElementById("dadosTabelaVideos1").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
                PrincipalControle.numBibliotecaDesejadaVideos += 1;
        };
    },

    listarBibliotecasDesejadas: function(biblioteca) {

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

        if (biblioteca.value.tipo == 1 && biblioteca.value.desejado == true) {
                document.getElementById("dadosTabelaLivros2").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
        };

        if (biblioteca.value.tipo == 2 && biblioteca.value.desejado == true) {
                document.getElementById("dadosTabelaMusicas2").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
        };

        if (biblioteca.value.tipo == 3 && biblioteca.value.desejado == true) {
                document.getElementById("dadosTabelaVideos2").innerHTML += 
                "<tr>" +
                    "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                    "<td class = \"classificacao\" colspan = \"2\">" + classificacao +"</td>" +
                "</tr>";
        };
    },
	
};

PrincipalControle.inicializar();