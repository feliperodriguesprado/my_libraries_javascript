UsuarioControle = {

	validarLogin: function(usuario, emailDigitado, senhaDigitada) {

		if (usuario) {
			if (emailDigitado == usuario.value.email) {
				if (senhaDigitada == usuario.value.senha) {
					UsuarioDAO.gravarSessao(usuario.primaryKey);
				} else {
					document.getElementById("email").value = "";
					document.getElementById("senha").value = "";
					document.getElementById("email").focus();
					document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou a senha informada estão incorretos.</span></div>";
				};
			} else{
				document.getElementById("email").value = "";
				document.getElementById("senha").value = "";
				document.getElementById("email").focus();
				document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou a senha informada estão incorretos.</span></div>";
			};
		} else {
			document.getElementById("email").value = "";
			document.getElementById("senha").value = "";
			document.getElementById("email").focus();
			document.getElementById("painelAvisos").innerHTML = "<div id = \"loginIncorreto\"> <span id = \"avisoSenha\">E-mail ou a senha informada estão incorretos.</span></div>";
		};
	}
};

