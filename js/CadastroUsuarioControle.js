var CadastroLoginControle = {

    inicializar: function() {

        window.setTimeout( function() {
                document.getElementById("nome").focus();
                ConexaoBancoDados.abrirBancoDados();
                CadastroLoginControle.botaoCadastrar();
                CadastroLoginControle.formularioCadastro();
                document.getElementById("nome").value = "";
                document.getElementById("email").value = "";
                document.getElementById("senha1").value = "";
                document.getElementById("senha2").value = "";
            } , 1000
        );
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
                
                //var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
                var pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

                if (nome.value != "" && email.value.match(pattern) && senha1.value != "" && senha2 != "") {
                    if (senha1.value == senha2.value) {
                        UsuarioDAO.cadastrarUsuario(nome, email, senha1, senha2);
                    } else {
                        document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">A senha informada e a confirmação da senha não são iguais</span></div>";

                        window.setTimeout( function() {
                        document.getElementById("painelAvisos").innerHTML = "";
                    } , 5000
                );
                    };
                };

            }
        );
    }
};

CadastroLoginControle.inicializar();
