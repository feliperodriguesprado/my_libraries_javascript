var LoginControle={

    obterConexaoBancoDados:ObterConexaoBancoDados,

    inicializar:function(){
        LoginControle.botaoAcessar();
        LoginControle.formularioLogin();
    },

    formularioLogin:function(){

        // Desabilitando o envio do submit
        var formularioLogin=document.getElementById("formularioLogin");
        
        if (formularioLogin){
            formularioLogin.onsubmit=function(event){
                return false;
            }
        };
    },

    botaoAcessar:function(){
        var botaoAcessar=document.getElementById("botaoAcessar");

        botaoAcessar.addEventListener('click', function(){
                var email=document.getElementById("email");
                var senha=document.getElementById("senha");
                
                if(email.value != "" && senha.value != ""){
                    LoginControle.buscaPorEmail(email);
                };
            }
        );
    },

    buscaPorEmail:function(email){
        var transaction=LoginControle.obterConexaoBancoDados.dataBase.transaction(["usuario"], "readonly");
        var objectUsuario=transaction.objectStore("usuario");
        
        // Busca por index: se o index não for unico, será trago o registro de menor primary key:
        var index=objectUsuario.index("email");
        var request=index.get(email.value);

        request.onerror=function(event){
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess=function(event){
            console.log("Sucesso ao localizar usuário");
            console.log("Usuário: "+request.result.nome);
        };
    },

    buscaPorPrimaryKey:function(primaryKey){
        var transaction=LoginControle.obterConexaoBancoDados.dataBase.transaction(["usuario"], "readonly");
        var objectUsuario=transaction.objectStore("usuario");
        
        // Busca o usuário pelo primary key:
    
        var request=objectUsuario.get(primaryKey);

        request.onerror=function(event){
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess=function(event){
            console.log("Sucesso ao localizar usuário");
            console.log("Usuário: "+request.result.nome);
        };
    },

    buscaTodos:function(){        
        var transaction=LoginControle.obterConexaoBancoDados.dataBase.transaction(["usuario"], "readonly");
        var objectUsuario=transaction.objectStore("usuario");
        
        // Busca todos os registros usando "openCursor()":
    
        var usuario=[];
        var request=objectUsuario.openCursor();

        request.onerror=function(event){
            console.log("Erro ao localizar usuário");
        };

        request.onsuccess=function(event){
            var cursor = request.result;
            if(cursor){
                usuario.push(cursor.value);
                console.log("Usuario :"+cursor.value.nome);
                cursor.continue();
            }else{
            console.log("Usuários: "+usuario);
            console.log("Sucesso ao localizar usuários");
            };
        };
    }

    // nao_implementada:function(){

    //     // Buscando vários registros pelo index:
    //     var index=objectUsuario.index("nome");
    //     var range=IDBKeyRange.only("busca"); // Somente se for igual "busca"
    //     var range=IDBKeyRange.lowerBound("busca"); // Combinações menores que "busca", incluindo "busca"
    //     var range=IDBKeyRange.lowerBound("busca", true); // Combinações menores que "busca", sem incluir "busca" 
    //     var range=IDBKeyRange.upperBound("busca", true); // Combinações maiores que "busca", não incluindo "busca"
    //     var range=IDBKeyRange.bound("busca", "busca", false, true); // Combinações entre "busca" e "busca", sem incluir "busca"
    
    //     var request=index.openCursor(range); // Usando o range criado acima
    //     var request=index.openCursor(); // Traz todos os dados

    //     request.onerror=function(event){
    //         console.log("Erro ao localizar usuário");
    //     };

    //     request.onsuccess=function(event) {
    //         var cursor=request.result;
    //         if(cursor){
    //             console.log("Usuário: "+cursor.value.nome);
    //             cursor.continue();
    //         }
    //         console.log("Sucesso ao localizar usuários");
    //     };
    // }
};

LoginControle.inicializar();