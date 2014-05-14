var LoginControle = {

    inicializar:function(){
        LoginControle.formularioLogin();
        LoginControle.botaoAcessar();
        ConexaoBancoDados.abrirBancoDados();
        //ConexaoBancoDados.excluirBancoDados();
    },

    formularioLogin:function(){

        // Desabilitando o envio do submit
        LoginControle.formulario = document.getElementById("formularioLogin");
        
        if (LoginControle.formulario){
            LoginControle.formulario.onsubmit=function(event){
                return false;
              }
        };
    },


    botaoAcessar:function(){

        var botaoAcessar = document.getElementById("botaoAcessar");
        var email = document.getElementById("email");
        var senha = document.getElementById("senha");

        botaoAcessar.addEventListener("click", function() {
                
                var email = document.getElementById("email");
                var senha = document.getElementById("senha");

                UsuarioDAO.limparSessao();
                
                if(email.value != "" && senha.value != "") {
                    UsuarioDAO.buscarPorEmail(email, senha);
                };
            }
        );

        /*
        email.addEventListener("focus", function() {
                document.getElementById("avisoEmail").innerHTML = "Informe seu email";
            }
        );

        email.addEventListener("blur", function() {
                document.getElementById("avisoEmail").innerHTML = "";
            }
        );

        senha.addEventListener("focus", function() {
                document.getElementById("avisoSenha").innerHTML = "Informe sua senha";
            }
        );
        senha.addEventListener("blur", function() {
                document.getElementById("avisoSenha").innerHTML = " ";
            }
        );
        */

    },
};

LoginControle.inicializar();