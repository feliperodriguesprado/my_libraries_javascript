var LoginControle = {

    inicializar:function() {
        LoginControle.formularioLogin();
        LoginControle.botaoAcessar();
        ConexaoBancoDados.abrirBancoDados();
        //ConexaoBancoDados.excluirBancoDados();
    },

    formularioLogin:function() {

        // Desabilitando o envio do submit
        LoginControle.formulario = document.getElementById("formularioLogin");
        
        if (LoginControle.formulario){
            LoginControle.formulario.onsubmit=function(event){
                return false;
              }
        };
    },


    botaoAcessar:function() {

        var botaoAcessar = document.getElementById("botaoAcessar");

        botaoAcessar.addEventListener("click", function() {
                
                var emailDigitado = document.getElementById("email");
                var senhaDigitada = document.getElementById("senha");
                
                if(emailDigitado.value != "" && senhaDigitada.value != "") {
                    UsuarioDAO.iniciarSessao(emailDigitado, senhaDigitada);
                };
            }
        );
    },
};

LoginControle.inicializar();