var PrincipalControle = {

	inicializar: function() {
		PrincipalControle.acessarContaUsuario();
	},

	acessarContaUsuario: function() {
		var linkContaUsuario = document.getElementById("linkContaUsuario");

		linkContaUsuario.addEventListener("click", function() {
             	console.log("Acessar conta do usuário.");
            }
        );
	}
};

PrincipalControle.inicializar();