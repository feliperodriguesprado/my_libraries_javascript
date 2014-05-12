var ConexaoBancoDados = {

    bancoDados: null,
    nomeBancoDados: "mylibraries",
    versaoBancoDados: 2,

    abrirBancoDados: function() {

        // Abrindo o banco. A funcão open() retorna um objeto IDBOpenDBRequest recebido por request
        var request = indexedDB.open(ConexaoBancoDados.nomeBancoDados, ConexaoBancoDados.versaoBancoDados);

        // Criando ou atualizando a versão do banco
        request.onupgradeneeded = function(event) {
            console.log("Atualizando banco de dados.");
            var bancoDadosOnUpgradeNeeded = event.target.result;
            
            bancoDadosOnUpgradeNeeded.onerror = function(event) {
                console.log("Erro ao abrir banco de dados para atualizar.");
            };

            bancoDadosOnUpgradeNeeded.onabort = function(event) {
                console.log("Abertura do banco de dados abortada.");
            };

            // Tabelas (ObjectStores):
            // -> usuario = indice 0.
            // -> biblioteca = indice 1.
            // -> emprestimos = indice 2.

            // Tabela "usuario".
            if (!bancoDadosOnUpgradeNeeded.objectStoreNames[0]) {

                // Criando a tabela "usuario" com uma primary key "usuarioid" auto incremento.
                var objectUsuario = bancoDadosOnUpgradeNeeded.createObjectStore("usuario", {KeyPath: "usuarioid", autoIncrement: true});

                // Criando os indices da tabela "usuario".
                objectUsuario.createIndex("nome", "nome", {unique: false});
                objectUsuario.createIndex("email", "email", {unique: true});
                objectUsuario.createIndex("senha", "senha", {unique: false});

                console.log("Tabela usuario criada.");
            };
            
            // Tabela "biblioteca".
            if (!bancoDadosOnUpgradeNeeded.objectStoreNames[1]) {
                
                // Criando a tabela "biblioteca" com uma primary key "bibliotecaid" auto incremento.
                var objectBiblioteca = bancoDadosOnUpgradeNeeded.createObjectStore("biblioteca", {KeyPath: "bibliotecaid", autoIncrement: true});

                // Criando os indices da tabela "biblioteca".
                objectBiblioteca.createIndex("tipo", "tipo", {unique: false});
                objectBiblioteca.createIndex("titulo", "titulo", {unique: true});
                objectBiblioteca.createIndex("descricao", "descricao", {unique: false});

                console.log("Tabela biblioteca criada.");
            };


            // Tabela "emprestimos".
            if (!bancoDadosOnUpgradeNeeded.objectStoreNames[2]) {

                // Criando a tabela "emprestimos" com uma primary Key "id" auto incremento.
                var objectUser = bancoDadosOnUpgradeNeeded.createObjectStore("emprestimos", {KeyPath: "id", autoIncrement: true});

                // Criando os indices da tabela "biblioteca".
                objectUser.createIndex("biblioteca", "biblioteca", {unique: false});
                objectUser.createIndex("item", "item", {unique: false});
                objectUser.createIndex("data", "data", {unique: false});
                objectUser.createIndex("nome", "nome", {unique: false});
                objectUser.createIndex("descricao", "descricao", {unique: false});   

                console.log("Tabela emprestimos criada.");             
            };

            bancoDadosOnUpgradeNeeded.onversionchange = function(event) {
                console.log("Versão alterada.");
            };
        };

        // Caso exista outra aba com versão antiga do banco de dados
        request.onblocked = function(event) {
            alert("Uma versão antiga da aplicação web está aberta em outra aba, feche-a por favor.");
        };

        // Caso aconteça algum erro ao abrir o banco de dados
        request.onerror = function(event) {
            ConexaoBancoDados.bancoDados = event.target.result;
            console.log("Erro ao abrir banco de dados.");
            console.log("Banco de dados: " + ConexaoBancoDados.bancoDados.name)
            console.log("Versão atual: " + ConexaoBancoDados.bancoDados.version);
        };

        // Caso o banco de dados abra corretamente
        request.onsuccess = function(event) {
            ConexaoBancoDados.bancoDados = event.target.result;
            console.log("Banco de dados inicializado.");
            console.log("Banco de dados: " + ConexaoBancoDados.bancoDados.name)
            console.log("Versão: " + ConexaoBancoDados.bancoDados.version);
        };
    },

    excluirBancoDados: function() {
        
        var request = indexedDB.deleteDatabase(ConexaoBancoDados.nomeBancoDados);

        request.onerror = function(event) {
            console.log("Error delete database");
        };

        request.onsuccess = function(event) {
            console.log("Success delete database");
        };
    }
};