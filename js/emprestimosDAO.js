var emprestimosDAO = {

 	insert: function(){


 		var verifica = document.getElementById("cod").value;
 		
 		if(verifica != ""){
 			var bib = document.getElementById("biblioteca").value;
		    var item = document.getElementById("item").value;
		    var data = document.getElementById("data").value;
		    var nome = document.getElementById("nome").value;
		    var descric = document.getElementById("text").value;

		    if((bib==0) || (data=="") || (nome=="")){
		    	alert("Por favor, Preencha todos os campos!");
		    }else{
 				emprestimosDAO.atualizar(verifica,bib,item,data,nome,descric);
		    }
		    
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

		    if((bib.value==0) || (data.value=="") || (nome.value=="")){
		    	alert("Por favor, preencha todos os campos");
		    }else{
			    var transaction = bancoDados.transaction(["emprestimos"], "readwrite");
			    var objectUser = transaction.objectStore("emprestimos");
			    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value, status: 1};
			    var request = objectUser.add(emp);

			    bib.value = 0;
			    item.value = 0;
			    data.value = "";
			    nome.value = "";
			    descric.value = "";

			    alert("Dado inserido com sucesso");	    	
		    }  
		}
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

	concluir:function(codigo){
		decisao = confirm("Deseja realmente concluir esse empréstimo?");
		if(decisao){

			var bancoDados = ConexaoBancoDados.bancoDados;
		    var objectStore = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos");
		    var request = objectStore.get(codigo);

		    data = new Date();
		    dia = data.getDate();
		    mes = data.getMonth();
		    ano = data.getFullYear();

		    dataEncerramento = dia + '/' + mes + '/' + ano;

		    request.onerror = function(event){
		        	alert("Houve um erro ao atualizar");
		        }

		        request.onsuccess = function(event){
		        	
		        	var datas = request.result;
		     
		        	datas.status = 0;
		        	datas.dataEncerramento = dataEncerramento;
		        	
		        	var requestUpdate=objectStore.put(datas,codigo);
		        	requestUpdate.onerror=function(event){
		        		alert("Não foi possivel concluir o emprestimo");
		        	}
		        	requestUpdate.onsuccess=function(event){
		        		alert("emprestimo concluido com sucesso!");
		        	}
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
	        
	        var retorno = event.target.result;
	        if(retorno) {
	            var biblioteca = retorno.value.biblioteca;
	            var item = retorno.value.item;
	            var name = retorno.value.nome;
	            var ids = retorno.key;
	            //nome da variavel proncipal. metodo
	            if(retorno.value.status == 1){
	            	emprestimosDAO.result(biblioteca,item,name,ids);	
	            }
	            retorno.continue();
	        }
	    }
	},

	deletar:function(id){
		decisao = confirm("Deseja realmente excluir esse empréstimo?");
		if(decisao){
			var bancoDados = ConexaoBancoDados.bancoDados;
		    var request = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos").delete(id);
		    request.onsuccess = function(event){
		        alert("Dado removido com sucesso");
		    } 
		    request.onerror = function(event){
		        alert("erro");
		    }
		}
	},

	result:function(biblioteca,item,nome,ids){
	    
	    var col1 = "<tr><td> " + biblioteca + "</td><td> " + item + "</td><td> " + nome + "</td>";
	    var col2 = "<td id='tabelaLinha_>" +ids + "'><input type='button' ";
	    var col3 = " value='Excluir' onclick=\"javascript:emprestimosDAO.deletar("+ids+"); window.location.reload();\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+"); window.location.reload();\"></input>";
	    document.getElementById("tabela").innerHTML += col1 + col2 + col3;
	    document.getElementById("tabela").innerHTML += "</td></tr>";
	 
	}
};