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
            BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                BibliotecaControle.listarBibliotecas(biblioteca);
            });
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

            var sessao = request.result;

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
            var usuario = request.result;
            callback(biblioteca, usuario);
        };
    },

    obterBibliotecas: function(callback) {

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
                    var biblioteca = request.result;

                    if (biblioteca) {
                        if (biblioteca.value.usuarioid == sessao.value.usuarioid) {
                            callback(biblioteca);
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
            var biblioteca = request.result;
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
            BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                BibliotecaControle.listarBibliotecas(biblioteca);
            });
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
                BibliotecaDAO.obterBibliotecas(function(biblioteca) {
                    BibliotecaControle.listarBibliotecas(biblioteca);
                });                
            };
        };
    }
};