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
    	document.getElementById("dadosTabelaFilmes").innerHTML = "";
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
		
        	   		if (biblioteca) {
        	   			console.log(biblioteca.value.nome);
		
        	   			if (biblioteca.value.tipo == 1 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
        	   				var bib = {bibliotecaid: biblioteca.primaryKey, nome: biblioteca.value.nome, tipo: biblioteca.value.tipo};
							document.getElementById("dadosTabelaFilmes").innerHTML += "<tr><td>" + biblioteca.value.nome + "</td><td><button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button><button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button></td></tr>";
        	   			};
        	   			if (biblioteca.value.tipo == 2 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
        	   				document.getElementById("dadosTabelaLivros").innerHTML += "<tr><td>" + biblioteca.value.nome + "</td><td><button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button><button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button></td></tr>";
        	   			};
        	   			if (biblioteca.value.tipo == 3 && biblioteca.value.usuarioid == sessao.value.usuarioid) {
        	   				document.getElementById("dadosTabelaMusicas").innerHTML += "<tr><td>" + biblioteca.value.nome + "</td><td><button type=\"button\" onClick = BibliotecaControle.botaoEditar(" + biblioteca.primaryKey + ");>Editar</button><button type=\"button\" onClick = BibliotecaControle.botaoExcluir(" + biblioteca.primaryKey + ");>Excluir</button></td></tr>";	
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

        var dadosBiblioteca = {tipo: biblioteca.tipo, usuarioid: biblioteca.usuarioid, nome: biblioteca.nome};
        var bibliotecaid = parseInt(biblioteca.bibliotecaid);

        var request = objectStore.put(dadosBiblioteca, bibliotecaid);
        
        request.onsuccess = function(event) {
            console.log("Sucesso ao cadastrar biblioteca");
            ConexaoBancoDados.bancoDados.close();
            document.getElementById("bibliotecaId").value = "";
            document.getElementById("nome").value = "";
            document.getElementById("tipo").value = "0";
            document.getElementById("nome").focus();
            BibliotecaDAO.listarBibliotecas();
        };
    }
};