var emprestimosDAO = {

 	insert: function(){

 		var verifica = document.getElementById("cod").value;
 		
 		if(verifica != ""){
 			var bib = document.getElementById("biblioteca").value;
		    var item = document.getElementById("item").value;
		    var data = document.getElementById("data").value;
		    var nome = document.getElementById("nome").value;
		    var descric = document.getElementById("text").value;
		    
 			emprestimosDAO.atualizar(verifica,bib,item,data,nome,descric);
 		}else{
	 		var bancoDados = ConexaoBancoDados.bancoDados;

		    //Para impedir a atualização da pagina.
		    var form = document.getElementById('for');
		        if(form){
		            form.onsubmit = function(event){
		                return false;
		            }
		        }

		    var bib = document.getElementById("biblioteca");
		    var item = document.getElementById("item");
		    var data = document.getElementById("data");
		    var nome = document.getElementById("nome");
		    var descric = document.getElementById("text");    

		    var transaction = bancoDados.transaction(["emprestimos"], "readwrite");
		    var objectUser = transaction.objectStore("emprestimos");
		    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value};
		    var request = objectUser.add(emp);

		    bib.value = 0;
		    item.value = 0;
		    data.value = "";
		    nome.value = "";
		    descric.value = "";

		    alert("Dado inserido com sucesso");
		}
		emprestimosDAO.selectAll();
	},

	update:function(ids){
		var bancoDados = ConexaoBancoDados.bancoDados;
	    var objectStore = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos");
	    var request = objectStore.get(ids);

	    request.onerror = function(event){
	        alert("Ocorreu um erro");
	    }

	    request.onsuccess = function(event){
	        var data = request.result;
	        document.getElementById("biblioteca").value = data.biblioteca;
	        document.getElementById("item").value = data.item;
	        document.getElementById("data").value = data.data;
	        document.getElementById("nome").value = data.nome;
	        document.getElementById("text").value = data.descricao;
	        document.getElementById("cod").value = ids;
	    }
	},

	atualizar:function(ids,bib,item,data,nome,descric){
			 var codigo = parseInt (ids);
			var bancoDados = ConexaoBancoDados.bancoDados;
	    	var objectStore = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos");
	    	var request = objectStore.get(codigo);
			
	        request.onerror = function(event){
	        	alert("Houve um erro ao atualizar");
	        }

	        request.onsuccess = function(event){
	        	
	        	var datas = request.result;
	        	//datas.Key = ids;
	        	datas.id=codigo;
	        	datas.biblioteca=bib;
	        	datas.item=item;
	        	datas.data=data;
	        	datas.nome=nome;
	        	datas.descricao=descric;
	        	
	        	var requestUpdate=objectStore.put(datas,codigo);
	        	requestUpdate.onerror=function(event){
	        		alert("Houve um erro ao atualizar");
	        	}
	        	requestUpdate.onsuccess=function(event){
	        		document.getElementById("biblioteca").value = 0;
			        document.getElementById("item").value = 0;
			        document.getElementById("data").value = "";
			        document.getElementById("nome").value = "";
			        document.getElementById("text").value = "";
	        		alert("Dados atualizados com Sucesso");
	        	}
	        }
	},

	select:function(){
	    var transaction = bancoDados.transaction(["emprestimos"]);
	    var objectUser = transaction.objectStore("emprestimos");
	    var request = objectUser.get(12);
	    request.onerror = function(event) {
	        alert("erro");
	    }
	    request.onsuccess = function(event) {
	       console.log(request.result.nome);
	    }
	},

	selectAll:function(){
		var bancoDados = ConexaoBancoDados.bancoDados;
	    var form = document.getElementById('for');
	    if(form){
	        form.onsubmit = function(event){
	            return false;
	        }
	    }
	    var transaction = bancoDados.transaction(["emprestimos"], "readonly");
	    var objectUser = transaction.objectStore("emprestimos");
	    var request = objectUser.openCursor();

	    request.onerror = function(event) {
	        alert("erro");
	    }
	    
	    request.onsuccess = function(event) {
	        //var retorno = request.result;
	        var retorno = event.target.result;
	        if(retorno) {
	            var biblioteca = retorno.value.biblioteca;
	            var item = retorno.value.item;
	            var name = retorno.value.nome;
	            var ids = retorno.key;
	            //nome da variavel proncipal. metodo
	            emprestimosDAO.result(biblioteca,item,name,ids);
	            retorno.continue();
	        }
	    }
	    
	},


	deletar:function(id){
		var bancoDados = ConexaoBancoDados.bancoDados;
	    var request = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos").delete(id);
	    request.onsuccess = function(event){
	        alert("Dado removido com sucesso");
	    } 
	    request.onerror = function(event){
	        alert("erro");
	    }
	},

	result:function(biblioteca,item,nome,ids){
	    //var nome = document.getElementById('nome').value;
	    var col1 = "<tr><td> " + biblioteca + "</td><td> " + item + "</td><td> " + nome + "</td>";
	    var col2 = "<td id='tabelaLinha_>" +ids + "'><input type='button' ";
	    var col3 = " value='Excluir' onclick=\"javascript:emprestimosDAO.deletar("+ids+")\"></input> <input type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input>";
	    document.getElementById("tabela").innerHTML += col1 + col2 + col3;
	    document.getElementById("tabela").innerHTML += "</td></tr>";
	    
	    //var nome = document.getElementById('nome').value;
	    /*var table = document.getElementById('tabela');
	    var numRow = table.rows.length;
	    var numCol = table.rows[numRow-1].cells.length;
	    var newRow = table.insertRow(numRow);

	    for(var j=0; j<numCol; j++){
	        newCell = newRow.insertCell(j);
	        newCell.innerHTML = nome;
	    }*/
	},

	removeLinha:function(id){
	    alert(id);
	    var remove = document.getElementById(id);
	    remove.removeChild(remove);
	}
};