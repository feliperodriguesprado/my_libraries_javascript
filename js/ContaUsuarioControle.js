var ContaUsuarioControle = {

	inicializar: function() {
		ConexaoBancoDados.abrirBancoDados(function() {
			ContaUsuarioControle.obterSessaoUsuario();
		});
		ContaUsuarioControle.formularioLogin();
		ContaUsuarioControle.botaoSalvarAlteracoes();
	},

	obterSessaoUsuario: function() {
		UsuarioDAO.obterSessao(function(usuario) {
			ContaUsuarioControle.exibirDadosUsuario(usuario);
		});
	},

	exibirDadosUsuario: function(usuario) {
		document.getElementById("email").innerHTML = usuario.value.email;
		document.getElementById("nome").value = usuario.value.nome;
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

	botaoSalvarAlteracoes: function() {
		
		botaoSalvarAlteracoes = document.getElementById("botaoSalvarAlteracoes");

		botaoSalvarAlteracoes.addEventListener("click", function() {
                
                console.log("Clicou em salvar alterações.");
            }
        );
	}
};

ContaUsuarioControle.inicializar();