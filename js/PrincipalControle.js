var PrincipalControle = {

	inicializar: function() {
		window.setTimeout( function() {
                PrincipalControle.botaoSair();
				ConexaoBancoDados.abrirBancoDados(function() {
					PrincipalControle.obterSessaoUsuario();
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
			PrincipalControle.exibirUsuarioTelaPrincipal(usuario);
		});
	},

	exibirUsuarioTelaPrincipal: function(usuario) {
		console.log(usuario.value.nome);

		document.getElementById("areaUsuario").innerHTML = "<span>Olá " + usuario.value.nome + "!</span>";
	}
	
};

PrincipalControle.inicializar();