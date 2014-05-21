var emprestimosControle = {
	inicializar:function(){
		ConexaoBancoDados.abrirBancoDados(function(){
			emprestimosDAO.selectAll();
		});
		emprestimosControle.salvar();		
	},

	salvar:function(){
		var inserir = document.getElementById("salvar");
		inserir.addEventListener('click', function(){
			emprestimosDAO.insert();
		})
	}
}

emprestimosControle.inicializar();