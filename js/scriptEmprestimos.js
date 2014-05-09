const DB_NAME = 'mylibraries';
const DB_VERSION = 1;

var dataBase=null;
var selecionar = document.getElementById("s");
selecionar.onclick=select;
var deleta = document.getElementById("d");
deleta.onclick=deletar;

var del = document.getElementById("sal");
del.onclick=result;




openDB();

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
        var mylibrariesObjectStore = dataBase.transaction("emprestimos", "readwrite").objectStore("emprestimos");
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

    var form = document.getElementById('for');
    if(form){
        form.onsubmit = function(event){
            alert("aqui");
            return false;
        }
    }

    var bib = document.getElementById("bib");
    var item = document.getElementById("item");
    var data = document.getElementById("data");
    var nome = document.getElementById("nome");
    var descric = document.getElementById("text");    

    var transaction = dataBase.transaction(["emprestimos"], "readwrite");
    var objectUser = transaction.objectStore("emprestimos");
    var emp = {biblioteca: bib.value, item: item.value, data: data.value, nome: nome.value, descricao: descric.value};
    var request = objectUser.add(emp);
//teste
    //result();
}

function select(){
    var transaction = dataBase.transaction(["emprestimos"]);
    var objectUser = transaction.objectStore("emprestimos");
    var request = objectUser.get(11);
    request.onerror = function(event) {
        alert("erro");
    }
    request.onsuccess = function(event) {
        alert(request.result.nome);
    }
}

function selectAll(){
    var transaction = dataBase.transaction(["emprestimos"], "readonly");
    var objectUser = transaction.objectStore("emprestimos");
    var request = objectUser.openCursor();

    request.onerror = function(event) {
        alert("erro");
    }
    request.onsuccess = function(event) {
        if(request){
        console.log(request.result.nome);
        request.continue();
    }
    }
    
}


function deletar(){
    var request = dataBase.transaction(["emprestimos"], "readwrite").objectStore("emprestimos").delete(6);
    request.onsuccess = function(event){
        alert("Dado removido com sucesso");
    } 
    request.onerror = function(event){
        alert("erro");
    }
}


function result(){
    
    var a = document.getElementById('nome').value;
    alert(a);
    var table = document.getElementById('tabela');
    var numRow = table.rows.length;
    var numCol = table.rows[numRow-1].cells.length;
    var newRow = table.insertRow(numRow);

    for(var j=0; j<numCol; j++){
        newCell = newRow.insertCell(j);
        newCell.innerHTML = a;
    }

// para atualizar pagina impedir o onload da pagina atualizar

}