var pageRunner = {
	inicializar:function(){
		ConexaoBancoDados.abrirBancoDados();
		pageRunner.emprestimosButton();
	}

	emprestimosButton:function(){
		var emp = document.getElementById("emprestimo");
		emp.addEventListener('click', function(){
			emprestimosDAO.selectAll();
		})
	}

	pageRunner.inicializar();
}