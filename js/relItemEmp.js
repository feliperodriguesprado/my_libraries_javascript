var relItemEmp = {


	btnAplicar:function(){

		var bancoDados = ConexaoBancoDados.bancoDados;

		var botao = document.getElementById('aplicar');

		botao.addEventListener('click', function(){

			var dataInicial = document.getElementById('inicio').value;
			var dataIni = new Date(dataInicial);
		    var diaIni = dataIni.getDate() + 1;
		    var mesIni = dataIni.getMonth() + 1;
			var anoIni = dataIni.getFullYear();
			
			var dataFinal = document.getElementById('fim').value;
			var dataFim = new Date(dataInicial);
		    var diaFim = dataFim.getDate() + 1;
		    var mesFim = dataFim.getMonth() + 1;
			var anoFim = dataFim.getFullYear();


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
		            var dIini = retorno.value.data;
		            var dFim = retorno.value.dataEncerramento;

		            if((dataIni>=dIini) && (dataFim<=dFim)){
		            	alert(name);
		            }

		            retorno.continue();
		        }
		    }

		});

	}

}