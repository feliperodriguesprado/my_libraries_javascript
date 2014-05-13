UsuarioControle = {
	nome: null,
	email: null,
	senha: null,

	validarEmailLogin: function(usuario, emailDigitado, senhaDigitada) {

		if (typeof usuario != "undefined") {
			if (emailDigitado.value == usuario.email) {
				if (senhaDigitada.value == usuario.senha) {
					window.location = "pageRunner.html";
				} else {
					document.getElementById("senha").focus();
					document.getElementById("avisoSenha").innerHTML = "Senha inválida";
				};
			} else{
				document.getElementById("email").focus();
				document.getElementById("avisoEmail").innerHTML = "E-mail inválido";
			};
		} else {
			document.getElementById("email").focus();
			document.getElementById("avisoEmail").innerHTML = "E-mail inválido";
		};
	}
}