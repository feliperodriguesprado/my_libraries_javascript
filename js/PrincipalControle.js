var PrincipalControle = {

	inicializar: function() {
		ConexaoBancoDados.abrirBancoDados(function() {
			PrincipalControle.obterSessaoUsuario();
		});
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