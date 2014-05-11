const DB_NAME = 'mylibraries';
const DB_VERSION = 1;

var dataBase = null;
var botaoCadastrar = document.getElementById('botaoCadastrar');

openDB();
console.log(dataBase);
botaoCadastrar.onclick = cadastrarUsuario;

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
        var objectUser = event.currentTarget.result.createObjectStore("usuario", { KeyPath: 'usuarioid', autoIncrement: true});

        // Indices da tabela user
        objectUser.createIndex('nome', 'nome', { unique: false });
        objectUser.createIndex('email', 'email', { unique: true });
        objectUser.createIndex('senha', 'senha', { unique: false });
    };
}

function cadastrarUsuario() {
    var nome=document.getElementById('nome');
    var email=document.getElementById('email');
    var senha1=document.getElementById('senha1');
    var senha2=document.getElementById('senha2');

    var transaction=dataBase.transaction(["usuario"], "readwrite");
    var objectUsers=transaction.objectStore("usuario");

    var usuario={nome: nome.value, senha: senha1.value, email: email.value};
    var request=objectUsers.add(usuario);

    request.onerror = function(event) {
        console.log("Erro ao cadastrar usuário");
    };

    request.onsuccess = function(event) {
        console.log("Sucesso ao cadastrar usuário");
        nome.value="";
        email.value="";
        senha1.value="";
        senha2.value="";
    };
}

