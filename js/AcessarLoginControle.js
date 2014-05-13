var AcessarLoginControle = {

	buscarEmail: function(email) {

		UsuarioDAO.buscarPorEmail(email);
		console.log(UsuarioDAO.emailUsuario);
	}

};