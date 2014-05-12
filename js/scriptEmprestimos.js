const DB_NAME = 'mylibraries';
const DB_VERSION = 1;

var dataBase=null;

var inserir = document.getElementById("salvar");
inserir.onclick=insert;

var selecionar = document.getElementById("s");
selecionar.onclick=selectAll;


//openDB();

function openDB() {
    
    // Abrindo o banco. A funcão open() retorna um objeto IDBOpenDBRequest recebido por request
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    // Tratando erro
    request.onerror = function(event) {
        console.log("Error load database");
    };

    // Tratando sucesso
    request.onsuccess = function(event) {
        console.log("Database initialised");
        dataBase = this.result;
    };

    // Criando ou atualizando a versão do banco
    request.onupgradeneeded = function(event) {
        console.log("Upgrading...");

        // Tabela user
        var objectUser = event.currentTarget.result.createObjectStore("emprestimos", { KeyPath: 'id', autoIncrement: true});

        // Indices da tabela user
        objectUser.createIndex('biblioteca', 'biblioteca', { unique: false });
        objectUser.createIndex('item', 'item', { unique: false });
        objectUser.createIndex('data', 'data', { unique: false });
        objectUser.createIndex('nome', 'nome', { unique: false });
        objectUser.createIndex('descricao', 'descricao', { unique: false });
        objectUser.transaction.oncomplete = function(event){
        var mylibrariesObjectStore = dataBase.transaction(["emprestimos"], "readwrite").objectStore("emprestimos");
        for (var i in insert()) {
            mylibrariesObjectStore.add(insert()[i]);
        };
    }
    };

}

function deleteDB() {
    var request = indexedDB.deleteDatabase(DB_NAME);

    request.onerror = function(event) {
        console.log("Error delete database");
    };

    request.onsuccess = function(event) {
        console.log("Success delete database");
    };
}

function insert(){

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

    var transaction = dataBase.transaction(["emprestimos"], "readwrite");
    var objectUser = transaction.objectStore("emprestimos");
    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value};
    var request = objectUser.add(emp);

    alert("Dado inserido com sucesso");
    //selectAll();
}

function update(ids){
    var objectStore = dataBase.transaction(["emprestimos"], "readwrite").objectStore("emprestimos");
    var request = objectStore.get(ids);

    request.onerror = function(event){
        alert("Ocorreu um erro");
    }

    request.onsuccess = function(event){
        var data = request.result;
        alert(data.nome);
        document.getElementById("nome").innerHTML = data.nome;
    }
}

function select(){
    var transaction = dataBase.transaction(["emprestimos"]);
    var objectUser = transaction.objectStore("emprestimos");
    var request = objectUser.get(12);
    request.onerror = function(event) {
        alert("erro");
    }
    request.onsuccess = function(event) {
       console.log(request.result.nome);
    }
}

function selectAll(){
    var form = document.getElementById('for');
    if(form){
        form.onsubmit = function(event){
            return false;
        }
    }
    var transaction = dataBase.transaction(["emprestimos"], "readonly");
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
            //alert(ids);
            result(biblioteca,item,name,ids);
            retorno.continue();
        }
    }
    
}


function deletar(id){
    var request = dataBase.transaction(["emprestimos"], "readwrite").objectStore("emprestimos").delete(id);
    request.onsuccess = function(event){
        alert("Dado removido com sucesso");
    } 
    request.onerror = function(event){
        alert("erro");
    }
}

var cod = 0;
function result(biblioteca,item,nome,ids){
    //var nome = document.getElementById('nome').value;
    var col1 = "<tr><td> " + biblioteca + "</td><td> " + item + "</td><td> " + nome + "</td>";
    var col2 = "<td id='tabelaLinha_>" +cod + "'><input type='button' ";
    var col3 = " value='Excluir' onclick=\"javascript:deletar("+ids+")\"></input> <input type='button' value='Alterar' onclick=\"javascript:update("+ids+")\"></input>";
    document.getElementById("tabela").innerHTML += col1 + col2 + col3;
    document.getElementById("tabela").innerHTML += "</td></tr>";
    
    /*var nome = document.getElementById('nome').value;
    var table = document.getElementById('tabela');
    var numRow = table.rows.length;
    var numCol = table.rows[numRow-1].cells.length;
    var newRow = table.insertRow(numRow);

    for(var j=0; j<numCol; j++){
        newCell = newRow.insertCell(j);
        newCell.innerHTML = nome;
    }*/
}

function removeLinha(id){
    alert(id);
    var remove = document.getElementById(id);
    remove.removeChild(remove);
    /*if(remove.parentNode){
        remove.parentNode.removeChild(remove);
    }else{
        alert("erro");
    }*/
}