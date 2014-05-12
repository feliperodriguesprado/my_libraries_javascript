var LoginControle={

    inicializar:function(){
        ConexaoBancoDados.abrirBancoDados();
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
                    var usuario = UsuarioDAO.buscaTodos();
                };
            }
        );
    },
};

LoginControle.inicializar();