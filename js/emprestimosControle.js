var emprestimosControle = {
	inicializar:function(){
		ConexaoBancoDados.abrirBancoDados();
		emprestimosControle.salvar();
		emprestimosControle.buscar();
	},

	salvar:function(){
		var inserir = document.getElementById("salvar");
		inserir.addEventListener('click', function(){
			emprestimosDAO.insert();
		})
	},

	buscar:function(){
		var selecionar = document.getElementById("s");
		selecionar.addEventListener('click', function(){
			emprestimosDAO.selectAll();
		})
	}
}

emprestimosControle.inicializar();