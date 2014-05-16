var LoginControle = {

    inicializar: function() {
        LoginControle.formularioLogin();
        LoginControle.botaoAcessar();
        ConexaoBancoDados.abrirBancoDados();
        //ConexaoBancoDados.excluirBancoDados();
    },

    formularioLogin: function() {

        // Desabilitando o envio do submit
        var formulario = document.getElementById("formularioLogin");
        
        if (formulario) {
            formulario.onsubmit = function(event) {
                return false;
              }
        };
    },


    botaoAcessar:function() {

        var botaoAcessar = document.getElementById("botaoAcessar");

        botaoAcessar.addEventListener("click", function() {
                
                var emailDigitado = document.getElementById("email");
                var senhaDigitada = document.getElementById("senha");
                //var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                var pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
                
                if(emailDigitado.value.match(pattern) && senhaDigitada.value != "") {
                    UsuarioDAO.iniciarSessao(emailDigitado, senhaDigitada);
                };
            }
        );
    }
};

LoginControle.inicializar();