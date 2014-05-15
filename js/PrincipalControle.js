var PrincipalControle = {

	inicializar: function() {
		ConexaoBancoDados.abrirBancoDados();
	},

	obterSessaoUsuario: function() {
		UsuarioDAO.buscaPorPrimaryKey(43);
	},

	
};

PrincipalControle.inicializar();