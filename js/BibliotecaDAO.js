var BibliotecaDAO = {

	cadastrarBiblioteca: function(biblioteca) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["biblioteca"], "readwrite");
        var objectStore = transaction.objectStore("biblioteca");

        var request = objectStore.add(biblioteca);

        request.onerror = function(event) {
            console.log("Erro ao cadastrar biblioteca");
        };

        request.onsuccess = function(event) {
            console.log("Sucesso ao cadastrar biblioteca");
            ConexaoBancoDados.bancoDados.close();
            document.getElementById("nome").value = "";
            document.getElementById("tipo").value = "0";
            document.getElementById("classificacao").value = "0";
            document.getElementById("desejado").checked = false;
            document.getElementById("nome").focus();
            BibliotecaDAO.listarBibliotecas();
        };
    },

    obterSessao: function(biblioteca, callback) {
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["sessao"], "readonly");
        var objectStore = transaction.objectStore("sessao");

        var request = objectStore.openCursor();

        request.onerror = function() {
            console.log("Erro ao obter sessão.");
        };

        request.onsuccess = function() {

            var sessao = event.target.result;

            if (typeof callback != "undefined") {
                callback(sessao, biblioteca);
            };
        };
    },

    buscaUsuarioPorPrimaryKey: function(primaryKey, biblioteca, callback) {
        
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectStore = transaction.objectStore("usuario");

        var request = objectStore.openCursor(primaryKey);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var usuario = event.target.result;
            callback(biblioteca, usuario);
        };
    },

    listarBibliotecas: function() {
    	
        document.getElementById("dadosTabelaVideos").innerHTML = "";
        document.getElementById("dadosTabelaLivros").innerHTML = "";
        document.getElementById("dadosTabelaMusicas").innerHTML = "";

    	ConexaoBancoDados.abrirBancoDados(function() {
    		
            BibliotecaDAO.obterSessao(null, function(sessao) {
    			var bancoDados = ConexaoBancoDados.bancoDados;
        		var transaction = bancoDados.transaction(["biblioteca"], "readonly");
        		var objectStore = transaction.objectStore("biblioteca");
	
        		var request = objectStore.openCursor();
	
        		request.onerror = function(event) {
        	   	console.log("Erro ao listar bibliotecas");
                };
        	   	
        	   	request.onsuccess = function(event) {
        	   		
                    var biblioteca = event.target.result;
                    var classificacao = null;
                    var desejado = null;

                    if (biblioteca) {
                            
                        switch(biblioteca.value.classificacao) {
                                case "1":
                                classificacao = "Adorei";
                                break;
                                case "2":
                                classificacao = "Gostei muito";
                                break;
                                case "3":
                                classificacao = "Gostei";
                                break;
                                case "4":
                                classificacao = "Não gostei";
                                break;
                                case "5":
                                classificacao = "Detestei";
                                break;
                        };

                        switch(biblioteca.value.desejado) {
                                case true:
                                desejado = "checked = \"true\"";
                                break;
                                case false:
                                desejado = "";
                        };

                        if (biblioteca.value.tipo == 1 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
                                document.getElementById("dadosTabelaLivros").innerHTML += "<tr>" +
                                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                                "<td colspan = \"2\">" + classificacao +"</td>" +
                                "<td colspan = \"3\">" +
                                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                                "<td colspan = \"4\">" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                                "</td></tr>";
                        };
                    
                        if (biblioteca.value.tipo == 2 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
                                document.getElementById("dadosTabelaMusicas").innerHTML += "<tr>" +
                                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                                "<td colspan = \"2\">" + classificacao +"</td>" +
                                "<td colspan = \"3\">" +
                                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                                "<td colspan = \"4\">" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                                "</td></tr>";
                        };
                    
                        if (biblioteca.value.tipo == 3 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
                                document.getElementById("dadosTabelaVideos").innerHTML += "<tr>" +
                                "<td colspan = \"1\">" + biblioteca.value.nome + "</td>" + 
                                "<td colspan = \"2\">" + classificacao +"</td>" +
                                "<td colspan = \"3\">" +
                                    "<input type = \"checkbox\" disabled " + desejado + ">" +
                                "<td colspan = \"4\">" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button>" +
                                    "<button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button>" +
                                "</td></tr>";
                        };

                        biblioteca.continue();
                    };
                };
            });
    	});
	},

	buscaBibliotecaPorPrimaryKey: function(primaryKey, callback) {
        
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["biblioteca"], "readonly");
        var objectStore = transaction.objectStore("biblioteca");

        var request = objectStore.openCursor(primaryKey);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var biblioteca = event.target.result;
            callback(biblioteca);
        };
    },

    alterarBiblioteca: function(biblioteca) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["biblioteca"], "readwrite");
        var objectStore = transaction.objectStore("biblioteca");

        var dadosBiblioteca = {tipo: biblioteca.tipo, usuarioid: biblioteca.usuarioid, nome: biblioteca.nome, classificacao: biblioteca.classificacao, desejado: biblioteca.desejado};
        var bibliotecaid = parseInt(biblioteca.bibliotecaid);

        var request = objectStore.put(dadosBiblioteca, bibliotecaid);
        
        request.onsuccess = function(event) {
            console.log("Sucesso ao cadastrar biblioteca");
            ConexaoBancoDados.bancoDados.close();
            document.getElementById("bibliotecaId").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("tipo").value = "0";
            document.getElementById("classificacao").value = "0";
            document.getElementById("desejado").checked = false;
            document.getElementById("nome").focus();
            BibliotecaDAO.listarBibliotecas();
        };
    },

    excluirBiblioteca: function (bibliotecaid, tipo) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["biblioteca"], "readwrite");
        var objectStore = transaction.objectStore("biblioteca");

        var request = objectStore.delete(bibliotecaid);

        request.onsuccess = function() {

            if (tipo == null) {
                ConexaoBancoDados.bancoDados.close();
                BibliotecaDAO.listarBibliotecas();                
            };
        };
    }
};