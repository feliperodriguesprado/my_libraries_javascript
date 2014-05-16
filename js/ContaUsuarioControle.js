var ContaUsuarioControle = {

	inicializar: function() {
		ConexaoBancoDados.abrirBancoDados(function() {
			ContaUsuarioControle.obterSessaoUsuario();
		});
	},

	obterSessaoUsuario: function() {
		UsuarioDAO.obterSessao(function(usuario) {
			ContaUsuarioControle.exibirDadosUsuario(usuario);
		});
	},

	exibirDadosUsuario: function(usuario) {
		document.getElementById("nome").value = usuario.value.nome;
		document.getElementById("email").value = usuario.value.email;
		
	}
};

ContaUsuarioControle.inicializar();