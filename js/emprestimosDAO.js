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
		    	document.getElementById('message').innerHTML = "<p id='error'>Por favor preencha todos os campos</p>";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },3000
		    	 );	 
		    }else{
		    	if((anoUser>anoSys) || (mesUser>mesSys) || (diaUser>diaSys)){
		    		document.getElementById('message').innerHTML = "<p id='error'>A data informada é maior que a data atual<p>";
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
		    	document.getElementById('message').innerHTML = "<p id='error'>Por favor preencha todos os campos</p>";
		    	 window.setTimeout( function() {
		    	 	window.location.reload();
		    	 },3000
		    	 );
		    }else{
		    	
		    	if((anoUser>anoSys) || (mesUser>mesSys) || (diaUser>diaSys)){
		    		document.getElementById('message').innerHTML = "<p id='error'>A data informada é maior que a data atual</p>";
		    	 	window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },3000
		    	 );
		   		}else{
		   			var transaction = bancoDados.transaction(["emprestimos"], "readwrite");
				    var objectUser = transaction.objectStore("emprestimos");
				    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value, status: 1};
				    var request = objectUser.add(emp);

				    var opcao = -1;
				    emprestimosDAO.atualzarVerifica(item.value, opcao);

				    bib.value = 0;
				    item.value = 0;
				    data.value = "";
				    nome.value = "";
				    descric.value = "";

				    document.getElementById('message').innerHTML = "<p id='sucess'>Empréstimo realizado com sucesso</p>";
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
	        //emprestimosDAO.selectEmp(data.item);
	        document.getElementById("item").value = data.item;
	        var cod = parseInt(data.item);
	        var obUser = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	        var req = obUser.get(cod);

	        req.onsuccess = function(event){
	        	var retorno = request.result;
	        	document.getElementById("item").value = data.item;
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
	        		datas.verifica = 1;
	        	else
	        		datas.verifica = -1;
	        	
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

	        		document.getElementById('message').innerHTML = "Dados atulizados com Sucesso";
		    		window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    	 );	 
	        	}
	        }
	},

	concluir:function(codigo){
		document.getElementById('message').innerHTML = "<p id='error'>Deseja realmente concluir esse empréstimo? <br> <input id='sim' type='button' value='SIM'></input> <input id='nao' type='button' value='NÃO'></input></p><br><br>";
		var decisaoSim = document.getElementById('sim');
		var decisaoNao = document.getElementById('nao');
		decisaoSim.addEventListener('click', function(){

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
		        	var opcao = 0;
				    emprestimosDAO.atualzarVerifica(datas.item, opcao);
		        	requestUpdate.onerror=function(event){
		        		alert("Não foi possivel concluir o emprestimo");
		        	}
		        	requestUpdate.onsuccess=function(event){
		        		document.getElementById('message').innerHTML = "<p id='sucess'>Empréstimo concluido com sucesso</p>";
		    			window.setTimeout( function() {
		    	 			window.location.reload();
		    			},1000
		    	 		);	 
		        	}
		        }
		});
		decisaoNao.addEventListener('click', function(){
			document.getElementById('message').innerHTML = "";
			window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    );	
		});
			
	},

	selectEmp:function(item){
		
		var codigo = parseInt (item);
		var bancoDados = ConexaoBancoDados.bancoDados;
	    var objectStore = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	    var request = objectStore.get(codigo);
	    request.onsuccess=function(event){
	    	var retorno = request.result;
	    	document.getElementById("item").value = retorno.nome;
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

	deletar:function(id,item){
		//decisao = confirm("Deseja realmente excluir esse empréstimo?");
		document.getElementById('message').innerHTML = "<p id='error'>Deseja realmente excluir esse empréstimo? <br> <input id='sim' type='button' value='SIM'></input> <input id='nao' type='button' value='NÃO'></input></p><br><br>";
		var decisaoSim = document.getElementById('sim');
		var decisaoNao = document.getElementById('nao');

		decisaoSim.addEventListener('click', function(){
			var bancoDados = ConexaoBancoDados.bancoDados;
		    var request = bancoDados.transaction(["emprestimos"], "readwrite").objectStore("emprestimos").delete(id);
		    var opcao = 0;
			emprestimosDAO.atualzarVerifica(item, opcao);
		    request.onsuccess = function(event){
		       document.getElementById('message').innerHTML = "<p id='sucess'>Empréstimo excluido com sucesso</p>";
		    	window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    	);	 
		    } 
		    request.onerror = function(event){
		        alert("erro");
		    }
		});

		decisaoNao.addEventListener('click', function(){
			document.getElementById('message').innerHTML = "";
			window.setTimeout( function() {
		    	 		window.location.reload();
		    	 },1000
		    );	
		});
		
	},

	result:function(biblioteca,item,nome,ids){

			var codigo = parseInt (item);
			var bancoDados = ConexaoBancoDados.bancoDados;
	    	var objectStore = bancoDados.transaction(["biblioteca"], "readwrite").objectStore("biblioteca");
	    	var request = objectStore.get(codigo);



	    request.onsuccess=function(event){

	    	var retorno = request.result;
	    	//alert(codigo);

		    if(biblioteca == 'musicas'){

				var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
			    var col2 = "<td><input type='button' ";
			    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+","+codigo+")\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
			    document.getElementById("tableMusicas").innerHTML += col1 + col2 + col3;
			    document.getElementById("tableMusicas").innerHTML += "</td></tr>";

			}else{
				if(biblioteca == 'livros'){
						 
						var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
					    var col2 = "<td><input type='button' ";
					    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+","+codigo+")\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
					    document.getElementById("tableLivros").innerHTML += col1 + col2 + col3;
					    document.getElementById("tableLivros").innerHTML += "</td></tr>";

				}else{
						var col1 = "<tr><td> " + retorno.nome + "</td><td> " + nome + "</td>";
					    var col2 = "<td><input type='button' ";
					    var col3 = " value='Excluir' id='d' onclick=\"javascript:emprestimosDAO.deletar("+ids+","+codigo+")\"></input> <input id='a' type='button' value='Alterar' onclick=\"javascript:emprestimosDAO.update("+ids+")\"></input> <input id='e' type='button' value='Encerrar' onclick=\"javascript:emprestimosDAO.concluir("+ids+")\"></input>";
					    document.getElementById("tableVideos").innerHTML += col1 + col2 + col3;
					    document.getElementById("tableVideos").innerHTML += "</td></tr>";
				}

			}

	    } 

		
	 
	}
};