var CadastroLoginControle = {

    inicializar: function() {
        ConexaoBancoDados.abrirBancoDados();
        CadastroLoginControle.botaoCadastrar();
        CadastroLoginControle.formularioCadastro();
    },

    formularioCadastro: function() {

        // Desabilitando o envio do submit
        var formularioCadastro = document.getElementById("formularioCadastro");
        
        if (formularioCadastro) {
            formularioCadastro.onsubmit=function(event) {
                return false;
            }
        };
    },

    botaoCadastrar: function() {

        var botaoCadastrar = document.getElementById("botaoCadastrar");

        botaoCadastrar.addEventListener("click", function() {
                var nome=document.getElementById("nome");
                var email=document.getElementById("email");
                var senha1=document.getElementById("senha1");
                var senha2=document.getElementById("senha2");
                
                if (senha1.value == senha2.value) {
                    UsuarioDAO.cadastrarUsuario(nome, email, senha1, senha2);
                } else {
                    document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">A senha informada e a confirmação da senha não são iguais.</span></div>";
                };
            }
        );
    },

    // cadastrarUsuario:function(nome, email, senha1, senha2){

    //     var transaction=CadastroLoginControle.obterConexaoBancoDados.dataBase.transaction(["usuario"], "readwrite");
    //     var objectUsuario=transaction.objectStore("usuario");

    //     var usuario={nome:nome.value, email:email.value, senha:senha1.value};
    //     var request=objectUsuario.add(usuario);

    //     request.onerror=function(event) {
    //         console.log("Erro ao cadastrar usuário");
    //     };

    //     request.onsuccess=function(event) {
    //         console.log("Sucesso ao cadastrar usuário");
    //     };
    // }
};

CadastroLoginControle.inicializar();
