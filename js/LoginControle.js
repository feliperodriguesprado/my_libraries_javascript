var LoginControle = {

    inicializar:function(){
        LoginControle.formularioLogin();
        LoginControle.botaoAcessar();
        ConexaoBancoDados.abrirBancoDados();
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

        botaoAcessar.addEventListener("click", function() {
                
                var email = document.getElementById("email");
                var senha = document.getElementById("senha");
                
                if(email.value != "" && senha.value != "") {
                    UsuarioDAO.buscarPorEmail(email, senha);
                };
            }
        );       
    },
};

LoginControle.inicializar();