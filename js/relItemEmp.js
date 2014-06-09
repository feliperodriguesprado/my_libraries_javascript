var relItemEmp = {

	init:function(){
		// var botao = document.getElementById('aplicar');
		// botao.addEventListener('click', function(){
		// 	relItemEmp.btnAplicar();
		// });
		ConexaoBancoDados.abrirBancoDados(function(){
			var botao = document.getElementById('aplicar');
			botao.addEventListener('click', function(){
			relItemEmp.btnAplicar();
		 });
		});
	},

	btnAplicar:function(){
		
		var bancoDados = ConexaoBancoDados.bancoDados;

			var dataInicial = document.getElementById('inicio').value;
			var dataInicial = new Date();
		    var diaIni = dataInicial.getDate();
		    var mesIni = dataInicial.getMonth()+1;
			var anoIni = dataInicial.getFullYear();

			var inicio = anoIni + '-' + mesIni + '-' + diaIni;
			//alert(inicio);
			
			var dataFinal = document.getElementById('fim').value;
			var dataFinal = new Date();
		    var diaFim = dataFinal.getDate();
		    var mesFim = dataFinal.getMonth()+ 1;
			var anoFim = dataFinal.getFullYear();

			var fim = anoFim + '-' + mesFim + '-' + diaFim;

			var transaction = bancoDados.transaction(["emprestimos"], "readonly");
		    var objectUser = transaction.objectStore("emprestimos");
		    var request = objectUser.openCursor();

		    request.onerror = function(event) {
		        alert("erro");
		    }
		    
		    request.onsuccess = function(event) {
		        
		        var retorno = event.target.result;
		        if(retorno) {
		            var biblioteca = retorno.value.biblioteca;
		            var item = retorno.value.item;
		            var name = retorno.value.nome;
		            var ids = retorno.key;
		            var dIni = retorno.value.data;
		            var dFim = retorno.value.dataEncerramento;

		            if((inicio>=dIni) && (fim<=dIni)){
		            	alert(name);
		            }

		            retorno.continue();
		        }
		    }

	}

};
relItemEmp.init();