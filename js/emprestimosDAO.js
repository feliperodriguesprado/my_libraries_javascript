var emprestimosDAO = {

 	insert: function(){
 		
 		var verifica = document.getElementById("cod").value;
 		
 		if(verifica != ""){
 			var bib = document.getElementById("biblioteca").value;
		    var item = document.getElementById("item").value;
		    var data = document.getElementById("data").value;
		    var nome = document.getElementById("nome").value;
		    var descric = document.getElementById("text").value;

		    var dataUser = new Date(data);
		    var diaUser = dataUser.getDate() + 1;
		    var mesUser = dataUser.getMonth() + 1;
			var anoUser = dataUser.getFullYear();

			var dataSys = new Date();
		    var diaSys = dataSys.getDate();
		    var mesSys = dataSys.getMonth() + 1;
		    var anoSys = dataSys.getFullYear();

		    if((bib=="") || (data=="") || (nome=="")){
		    	document.getElementById('error').innerHTML = "Por favor preencha todos os campos";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },3000
		    	 );	 
		    }else{
		    	if((anoUser>anoSys) || (mesUser>mesSys) || (diaUser>diaSys)){
		    		document.getElementById('error').innerHTML = "A data informada é maior que a data atual";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },3000
		    	 );	 
		   		}else{
 					emprestimosDAO.atualizar(verifica,bib,item,data,nome,descric);
 				}
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

		    var dataUser = new Date(data.value);
		    var diaUser = dataUser.getDate() + 1;
		    var mesUser = dataUser.getMonth() + 1;
			var anoUser = dataUser.getFullYear();

			var dataSys = new Date();
		    var diaSys = dataSys.getDate();
		    var mesSys = dataSys.getMonth() + 1;
		    var anoSys = dataSys.getFullYear();

		    if((bib.value=="") || (data.value=="") || (nome.value=="")){
		    	document.getElementById('error').innerHTML = "Preencha todos os campos";
		    	 window.setTimeout( function() {
		    	 	window.location.reload();
		    	 },3000
		    	 );
		    }else{
		    	
		    	if((anoUser>anoSys) || (mesUser>mesSys) || (diaUser>diaSys)){
		    		document.getElementById('error').innerHTML = "A data informada é maior que a data atual";
		    	 	window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },3000
		    	 );
		   		}else{
		   			var transaction = bancoDados.transaction(["emprestimos"], "readwrite");
				    var objectUser = transaction.objectStore("emprestimos");
				    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value, status: 1};
				    var request = objectUser.add(emp);

				    var opcao = 0;
				    emprestimosDAO.atualzarVerifica(item.value, opcao);

				    bib.value = 0;
				    item.value = 0;
				    data.value = "";
				    nome.value = "";
				    descric.value = "";

				    document.getElementById('error').innerHTML = "Empréstimo realizado com sucesso";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    	 );	 
		   		}  	
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
	        //document.getElementById("item").value = data.item;
	        var cod = parseInt(data.item);
	        var obUser = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	        var req = obUser.get(cod);

	        req.onsuccess = function(event){
	        	var retorno = request.result;
	        	document.getElementById("item").value = retorno.nome;
	        }


	        document.getElementById("data").value = data.data;
	        document.getElementById("nome").value = data.nome;
	        document.getElementById("text").value = data.descricao;
	        document.getElementById("cod").value = ids;
	    }
	},

	atualzarVerifica:function(item, opcao){
			var codigo = parseInt (item);
			var bancoDados = ConexaoBancoDados.bancoDados;
	    	var objectStore = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	    	var request = objectStore.get(codigo);
			
	        request.onerror = function(event){
	        	alert("Houve um erro ao atualizar");
	        }

	        request.onsuccess = function(event){
	        
	        	var datas = request.result;
	        	
	        	if(opcao == 0)
	        		datas.verifica = -1;
	        	else
	        		datas.verifica = 1;
	        	
	        	var requestUpdate=objectStore.put(datas,codigo);
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

	        		document.getElementById('error').innerHTML = "Dados atulizados com Sucesso";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    	 );	 
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
		    mes = data.getMonth()+1;
		    ano = data.getFullYear();

		    if(mes<10){
		    	mes = '0'+mes;
		    }
		    if(dia<10){
		    	dia ='0'+dia;
		    }

		    dataEncerramento = ano + '-' + mes + '-' + dia;

		    request.onerror = function(event){
		        	alert("Houve um erro ao atualizar");
		        }

		        request.onsuccess = function(event){
		        	
		        	var datas = request.result;
		     
		        	datas.status = 0;
		        	datas.dataEncerramento = dataEncerramento;
		        	
		        	var requestUpdate=objectStore.put(datas,codigo);
		        	var opcao = 1;
				    emprestimosDAO.atualzarVerifica(datas.item, opcao);
		        	requestUpdate.onerror=function(event){
		        		alert("Não foi possivel concluir o emprestimo");
		        	}
		        	requestUpdate.onsuccess=function(event){
		        		document.getElementById('error').innerHTML = "Empréstimo concluido com sucesso";
		    			window.setTimeout( function() {
		    	 			window.location.reload();
		    			},1000
		    	 		);	 
		        	}
		        }
		}
			
	},

	selectEmp:function(biblioteca){
		//alert(biblioteca.primaryKey);
		//alert(biblioteca.value.nome);
		//biblioteca.primaryKey = -1;
		//alert(biblioteca.primaryKey);
		//alert(biblioteca.value.nome);

		var cod = biblioteca.primaryKey;
		var n = biblioteca.value.nome;

		var verifica = 0;


		var bancoDados = ConexaoBancoDados.bancoDados;
	    
	    var transaction = bancoDados.transaction(["emprestimos"], "readonly");
	    var objectUser = transaction.objectStore("emprestimos");
	    var request = objectUser.openCursor();

	    request.onerror = function(event) {
	        alert("erro");
	    }
	    
	    request.onsuccess = function(event) {
	        
	        var retorno = event.target.result;
	        var flag = false;

	        if(retorno) {
	         
	            var item = retorno.value.item;
	            
	            if(cod == item){
	            	flag = true;
	            	if(retorno.value.status == 0){
	            		alert('o item ' + n + ' foi emprestado mas foi devolvido');
	            	}else{
	            		alert('o item ' + n + ' foi emprestado');
	            	}        	
	            } else {
	            	alert('o item ' + n + ' não foi emprestado');
	            	flag = true;
	            }

	            if (flag) {
	            	retorno.continue();
	            };
	        }
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
		    //var opcao = 1;
			//emprestimosDAO.atualzarVerifica(id, opcao);
		    request.onsuccess = function(event){
		       document.getElementById('error').innerHTML = "Empréstimo excluido com sucesso";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    	 );	 
		    } 
		    request.onerror = function(event){
		        alert("erro");
		    }
		}
	},

	result:function(biblioteca,item,nome,ids){

			var codigo = parseInt (item);
			var bancoDados = ConexaoBancoDados.bancoDados;
	    	var objectStore = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	    	var request = objectStore.get(codigo);



	    request.onsuccess=function(event){

	    	var retorno = request.result;

		    if(biblioteca == 'musicas'){

				var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
			    var col2 = "<td><input type='button' ";
			    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+"); window.location.reload();\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
			    document.getElementById("tableMusicas").innerHTML += col1 + col2 + col3;
			    document.getElementById("tableMusicas").innerHTML += "</td></tr>";

			}else{
				if(biblioteca == 'livros'){
						 
						var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
					    var col2 = "<td><input type='button' ";
					    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+"); window.location.reload();\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
					    document.getElementById("tableLivros").innerHTML += col1 + col2 + col3;
					    document.getElementById("tableLivros").innerHTML += "</td></tr>";

				}else{
						var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
					    var col2 = "<td><input type='button' ";
					    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+"); window.location.reload();\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
					    document.getElementById("tableVideos").innerHTML += col1 + col2 + col3;
					    document.getElementById("tableVideos").innerHTML += "</td></tr>";
				}

			}

	    } 

		
	 
	}
};