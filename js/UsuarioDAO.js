var UsuarioDAO = {

    obterTransacaoUsuario: function() {
        UsuarioDAO.bancoDados = ConexaoBancoDados.bancoDados;
        UsuarioDAO.transaction = UsuarioDAO.bancoDados.transaction(["usuario"], "readwrite");
        UsuarioDAO.objectUsuario = UsuarioDAO.transaction.objectStore("usuario");
    },

	cadastrarUsuario: function(nome, email, senha1, senha2) {

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readwrite");
        var objectUsuario = transaction.objectStore("usuario");

        var usuario = {nome: nome.value, email: email.value, senha: senha1.value};
        var request = objectUsuario.add(usuario);

        request.onerror = function(event) {
            console.log("Erro ao cadastrar usuário");
        };

        request.onsuccess = function(event) {
            console.log("Sucesso ao cadastrar usuário");
        };
    },

    // Busca por index: se o index não for unico, será trago o registro de menor primary key
	buscarPorEmail: function(emailDigitado, senhaDigitada){

        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectUsuario = transaction.objectStore("usuario");

        var index = objectUsuario.index("email");
        var request = index.get(emailDigitado.value);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            UsuarioControle.validarEmailLogin(event.target.result, emailDigitado, senhaDigitada);
        };

    },


    // Busca o usuário pelo primary key
    buscaPorPrimaryKey: function(primaryKey) {
        
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectUsuario = transaction.objectStore("usuario");
    
        var request = objectUsuario.get(primaryKey);

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            console.log("Sucesso ao localizar usuário");
            console.log("Usuário: " + request.result.nome);
        };
    },


    // Busca todos os registros usando "openCursor()"
    buscaTodos: function() {        
        
        var bancoDados = ConexaoBancoDados.bancoDados;
        var transaction = bancoDados.transaction(["usuario"], "readonly");
        var objectUsuario = transaction.objectStore("usuario");
        
        var usuario = [];
        var request = objectUsuario.openCursor();

        request.onerror = function(event) {
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess = function(event) {
            var cursor = request.result;
            if (cursor) {
                usuario.push(cursor.value);
                console.log("Usuario :" + cursor.value.nome);
                cursor.continue();
            } else {
            console.log("Usuários: " + usuario);
            console.log("Sucesso ao localizar usuários");
            };
        };
    }

	// nao_implementada:function(){
 //    	// Buscando vários registros pelo index:
 //    	var index=objectUsuario.index("nome");
 //    	var range=IDBKeyRange.only("busca"); // Somente se for igual "busca"
 //    	var range=IDBKeyRange.lowerBound("busca"); // Combinações menores que "busca", incluindo "busca"
 //    	var range=IDBKeyRange.lowerBound("busca", true); // Combinações menores que "busca", sem incluir "busca" 
 //    	var range=IDBKeyRange.upperBound("busca", true); // Combinações maiores que "busca", não incluindo "busca"
 //    	var range=IDBKeyRange.bound("busca", "busca", false, true); // Combinações entre "busca" e "busca", sem incluir "busca"
    
 //    	var request=index.openCursor(range); // Usando o range criado acima
 //    	var request=index.openCursor(); // Traz todos os dados

 //    	request.onerror=function(event){
 //        	console.log("Erro ao localizar usuário");
 //    	};

 //    	request.onsuccess=function(event) {
 //        	var cursor=request.result;
 //        	if(cursor){
 //            	console.log("Usuário: "+cursor.value.nome);
 //            	cursor.continue();
 //        	}
 //        	console.log("Sucesso ao localizar usuários");
 //    	};
	// }
};