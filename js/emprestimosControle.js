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
	},

	obterItens:function(){
		document.getElementById("item").innerHTML = "<option>Escolha o Item</option>";
		BibliotecaDAO.obterBibliotecas(function(biblioteca){
			emprestimosControle.listarItens(biblioteca);
		});
	},

	listarItens:function(biblioteca){
		console.log(document.getElementById('biblioteca').value);
		console.log(biblioteca.value.tipo);

		switch(document.getElementById('biblioteca').value){
			case "livros":
				if((biblioteca.value.tipo == 1) && (biblioteca.value.desejado == false))
					document.getElementById("item").innerHTML +=  "<option>"+ biblioteca.value.nome+"</option>";
				break;
			case "musicas":
				if((biblioteca.value.tipo == 2)&&(biblioteca.value.desejado == false))
					document.getElementById("item").innerHTML += "<option>"+ biblioteca.value.nome+"</option>";
				break;
			case "videos":
				if((biblioteca.value.tipo == 3)&&(biblioteca.value.desejado == false))
					document.getElementById("item").innerHTML += "<option>"+ biblioteca.value.nome+"</option>";
				break;
						
		} 

	}
}

emprestimosControle.inicializar();