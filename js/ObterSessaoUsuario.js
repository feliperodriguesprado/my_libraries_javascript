var ObterSessaoUsuario = {

	inicializar: function() {
		window.setTimeout( function() {
                ObterSessaoUsuario.botaoSair();
				ConexaoBancoDados.abrirBancoDados(function() {
					ObterSessaoUsuario.obterSessaoUsuario();
				});
            } , 0000
        );
	},

	botaoSair: function() {
		botaoSair = document.getElementById("botaoSair");

		botaoSair.addEventListener("click", function() {
				console.log("Usuario saiu.");
				UsuarioDAO.finalizarSessao();
            }
        );
	},

	obterSessaoUsuario: function() {
		UsuarioDAO.obterSessao(function(usuario) {
			ObterSessaoUsuario.exibirUsuarioTelaPrincipal(usuario);
		});
	},

	exibirUsuarioTelaPrincipal: function(usuario) {
		console.log(usuario.value.nome);

		document.getElementById("areaUsuario").innerHTML = "<span>Olá " + usuario.value.nome + "!</span>";
	}
	
};

ObterSessaoUsuario.inicializar();