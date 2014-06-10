var ContaUsuarioControle = {

	usuario: null,

	inicializar: function() {

    window.setTimeout( function() {
                ConexaoBancoDados.abrirBancoDados(function() {
                    ContaUsuarioControle.obterSessaoUsuario(function(){
                        UsuarioDAO.obterSessao(function(usuario) {
                            ContaUsuarioControle.exibirDadosUsuario(usuario);
                        });
                    });
                });
                ContaUsuarioControle.formularioLogin();
                ContaUsuarioControle.botaoSalvarAlteracoes();
                ContaUsuarioControle.botaoExcluirConta();
            } , 0000
        );
	},

	obterSessaoUsuario: function(callback) {
        callback();
	},

	exibirDadosUsuario: function(usuario) {
		ContaUsuarioControle.usuario = usuario;
		document.getElementById("email").innerHTML = usuario.value.email;
		document.getElementById("nome").value = usuario.value.nome;
	},

	formularioLogin: function() {
        // Desabilitando o envio do submit
        var formulario = document.getElementById("formularioLogin");
        
        if (formulario) {
            formulario.onsubmit = function(event) {
            	return false;
            };
        };
    },

	botaoSalvarAlteracoes: function() {
		
		botaoSalvarAlteracoes = document.getElementById("botaoSalvarAlteracoes");

		botaoSalvarAlteracoes.addEventListener("click", function() {

				var nome = document.getElementById("nome");
				var senhaAtual = document.getElementById("senhaAtual");
               	var senha1 = document.getElementById("senha1");
               	var senha2 = document.getElementById("senha2");

               	if (nome.value != "" && senhaAtual.value != "" && senha1.value != "" && senha2.value != "") {
                	if (ContaUsuarioControle.usuario.value.senha == senhaAtual.value) {
                		if (senha1.value == senha2.value) {
                			ContaUsuarioControle.usuario.value.nome = nome.value;
                			ContaUsuarioControle.usuario.value.senha = senha1.value;
                			UsuarioDAO.alterarUsuario(ContaUsuarioControle.usuario);
                		} else {
                			document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">A senha informada e a confirmação da senha não são iguais</span></div>";
                		} ;
                	} else {
                		document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">Senha atual incorreta</span></div>";	
                	} ;
               	} else {
               		document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">Informe corretament os campos acima</span></div>";
               	} ;

            }
        );
	},

    botaoExcluirConta: function() {

        botaoExcluirConta = document.getElementById("botaoExcluirConta");

        botaoExcluirConta.addEventListener("click", function() {

            document.getElementById("painelConfirmacaoExcluirConta").innerHTML += 
            "<div id = \"confirmacao\" class = \"modalConfirmacao\">" +
            "<div>" +
                "<label>Tem certeza que deseja excluir sua conta? Todas seus dados serão excluídos!</label>" + 
                "<div id = \"painelBotoesConfirmacao\">" +
                    "<button id = \"botaoConfirmacaoSim\" class = \"botaoConfirmacao\" type = \"button\">Sim</button>" +
                    "<button id = \"botaoConfirmacaoNao\" class = \"botaoConfirmacao\" type = \"button\">Não</button>" +
                "</div>" +
            "</div>" +
            "</div>";

            botaoSim = document.getElementById("botaoConfirmacaoSim");
            botaoNao = document.getElementById("botaoConfirmacaoNao");

            botaoSim.addEventListener("click", function(){
                document.getElementById("painelConfirmacaoExcluirConta").innerHTML = "";

                UsuarioDAO.obterSessao(function(usuario) {
                    UsuarioDAO.excluirConta(usuario);
                });
            });

            botaoNao.addEventListener("click", function(){
                document.getElementById("painelConfirmacaoExcluirConta").innerHTML = "";
            });
        });
    }
};

ContaUsuarioControle.inicializar();