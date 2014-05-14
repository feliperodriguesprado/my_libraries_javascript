UsuarioControle = {

	validarEmailLogin: function(usuario, emailDigitado, senhaDigitada) {

		if (usuario) {
			if (emailDigitado.value == usuario.value.email) {
				if (senhaDigitada.value == usuario.value.senha) {
					document.getElementById("email").innerHTML = "";
					document.getElementById("senha").innerHTML = "";

					UsuarioDAO.iniciarSessao(usuario.primaryKey);

					window.location = "pageRunner.html";
				} else {
					document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou senha inválido.</span></div>";
				};
			} else{
				document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou senha inválido.</span></div>";
			};
		} else {
			document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou senha inválido.</span></div>";
		};
	}
}

