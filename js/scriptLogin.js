const DB_NAME = 'mylibraries';
const DB_VERSION = 1;

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
        var objectUser = event.currentTarget.result.createObjectStore("user", { KeyPath: 'userid', autoIncrement: true});

        // Indices da tabela user
        objectUser.createIndex('email', 'email', { unique: true });
        objectUser.createIndex('password', 'password', { unique: false });
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