var UsuarioDAO = {

    iniciarSessao: function(emailDigitado, senhaDigitada) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["sessao"], "readwrite");
        var objectStore = transaction.objectStore("sessao");

        var request = objectStore.clear();

        var emailDigitado = emailDigitado.value;
        var senhaDigitada = senhaDigitada.value;

        request.onsuccess = function(event) {
            UsuarioDAO.validarEmailLogin(emailDigitado, senhaDigitada);
        }
    },

    gravarSessao: function(usuarioid) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["sessao"], "readwrite");
        var objectStore = transaction.objectStore("sessao");

        var sessao = {usuarioid: usuarioid};
        var request = objectStore.add(sessao);

        request.onerror = function(event) {
            console.log("Erro ao iniciar sessao");
        };

        request.onsuccess = function(event) {
            ConexaoBancoDados.bancoDados.close();
            window.location = "principal.html";
        };
    },

    cadastrarUsuario: function(nome, email, senha1, senha2) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readwrite");
        var objectStore = transaction.objectStore("usuario");

        var usuario = {nome: nome.value, email: email.value, senha: senha1.value};
        var request = objectStore.add(usuario);

        request.onerror = function(event) {
            console.log("Erro ao cadastrar usuário");
            alert("Usuario já existe, favor fazer login.");
            window.location = "login.html";
        };

        request.onsuccess = function(event) {
            console.log("Sucesso ao cadastrar usuário");
            UsuarioDAO.iniciarSessao(email, senha1);
        };
    },

    // Busca por index com cursor: é criado um range que irá trazer somente valores iguais a esse range.
	validarEmailLogin: function(emailDigitado, senhaDigitada) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectStore = transaction.objectStore("usuario");

        var index = objectStore.index("email");
        var range = IDBKeyRange.only(emailDigitado); 
        var request = index.openCursor(range);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var cursor = event.target.result;
            UsuarioControle.validarLogin(cursor, emailDigitado, senhaDigitada);
        };
    },

    // Busca o usuário pelo primary key
    buscaUsuarioPorPrimaryKey: function(primaryKey, callback) {
        
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectStore = transaction.objectStore("usuario");
    
        /*
        var request = objectStore.get(primaryKey);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var usuario = request.result;
            callback(usuario);
        };
        */

        ///var index = objectStore.index("usuarioid");
        //var range = IDBKeyRange.only(primaryKey); 
        var request = objectStore.openCursor(primaryKey);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var usuario = event.target.result;
            callback(usuario);
            //UsuarioControle.validarLogin(cursor, emailDigitado, senhaDigitada);
        };

    },

    obterSessao: function(callback) {
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["sessao"], "readonly");
        var objectStore = transaction.objectStore("sessao");

        var request = objectStore.openCursor();

        request.onerror = function() {
            console.log("Erro ao obter sessão.");
        };

        request.onsuccess = function() {

            var cursor = event.target.result;
            
            if (cursor) {
                UsuarioDAO.buscaUsuarioPorPrimaryKey(cursor.value.usuarioid, callback);
            };
        };
    }
};

 //    // As buscas abaixo não estão sendo utilizadas, foram feitas para aprendizado.


 //    // Busca todos os registros usando "openCursor()"
 //    buscaTodos: function() {        
        
 //        var bancoDados = ConexaoBancoDados.bancoDados;
 //        var transaction = bancoDados.transaction(["usuario"], "readonly");
 //        var objectStore = transaction.objectStore("usuario");
        
 //        var usuario = [];
 //        var request = objectStore.openCursor();

 //        request.onerror = function(event) {
 //            console.log("Erro ao localizar usuário");
 //        };

 //        request.onsuccess = function(event) {
 //            var cursor = request.result;
 //            if (cursor) {
 //                usuario.push(cursor.value);
 //                console.log("Usuario :" + cursor.value.nome);
 //                cursor.continue();
 //            } else {
 //            console.log("Usuários: " + usuario);
 //            console.log("Sucesso ao localizar usuários");
 //            };
 //        };
 //    }

 //    // Buscando vários registros pelo index:
 //    nao_implementada:function() {

 //    	var index = objectStore.index("nome");
 //    	var range = IDBKeyRange.only("busca"); // Somente se for igual "busca"
 //    	var range = IDBKeyRange.lowerBound("busca"); // Combinações menores que "busca", incluindo "busca"
 //    	var range = IDBKeyRange.lowerBound("busca", true); // Combinações menores que "busca", sem incluir "busca" 
 //    	var range = IDBKeyRange.upperBound("busca", true); // Combinações maiores que "busca", não incluindo "busca"
 //    	var range = IDBKeyRange.bound("busca", "busca", false, true); // Combinações entre "busca" e "busca", sem incluir "busca"
    
 //    	var request = index.openCursor(range); // Usando o range criado acima
 //    	var request = index.openCursor(); // Traz todos os dados

 //    	request.onerror = function(event) {
 //        	console.log("Erro ao localizar usuário");
 //    	};

 //    	request.onsuccess = function(event) {
 //        	var cursor = request.result;
 //        	if (cursor) {
 //            	console.log("Usuário: " + cursor.value.nome);
 //            	cursor.continue();
 //        	}
 //        	console.log("Sucesso ao localizar usuários");
 //    	};
	// }
