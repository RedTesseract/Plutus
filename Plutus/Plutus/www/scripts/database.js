function DBGetAll(indexName, value, _callMethod) {
    InitializeDatabase().then(function (db) {
        if (db == null) {
            console.log("Error: DB read error");
        } else {
            var tx = db.transaction("PlutusStore", "readwrite");
            var store = tx.objectStore("PlutusStore");
            var typeIndex = store.index(indexName);

            var request = typeIndex.getAll(value);

            request.onsuccess = function () {
                _callMethod(request.result);
            };

            tx.oncomplete = function () {
                db.close();
            };
        }
    });
};

function DBInsertObject(object) {
    InitializeDatabase().then(function (db) {
        if (db == null) {
            console.log("Error: DB insert error");
        } else {
            var tx = db.transaction("PlutusStore", "readwrite");
            var store = tx.objectStore("PlutusStore");

            var request = store.put(object);

            request.onsuccess = function () {
                location.reload(); //TODO???
            };

            tx.oncomplete = function () {
                db.close();
            };
        }
    });
};

function InitializeDatabase() {

    return new Promise(function (resolve, reject) {
        var checkDb = window.indexedDB ||
            window.mozIndexedDB ||
            window.webkitIndexedDB ||
            window.msIndexedDB;
        if (checkDb) {
            var db;
            var databaseName = 'plutusDB';
            var databaseVersion = 1;
            var openRequest = window.indexedDB.open(databaseName, databaseVersion);

            openRequest.onerror = function (event) {
                console.log(openRequest.errorCode);
                resolve(null);
            };

            openRequest.onupgradeneeded = function (event) {
                var db = event.target.result;
                db.onerror = function () {
                    console.log(db.errorCode);
                };

                var store = db.createObjectStore("PlutusStore", { keyPath: "id", autoIncrement: true });
                store.createIndex("BudgetStartDateIndex", "start_date", { unique: false });
                store.createIndex("CreationDateIndex", "creation_date", { unique: false });
                store.createIndex("TypeIndex", "type", { unique: false });
                store.createIndex("UsernameIndex", "username", { unique: false });
            };

            openRequest.onsuccess = function (event) {
                db = openRequest.result;
                resolve(db);
            };
        } else {
            resolve(null);
        }
    });
};

//Web SQL
/*var db = window.openDatabase("plutusDB", "1.0", "Plutus Storage", 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)', [], function (tx, result) {
        console.log(result);
    }, function (error) {
        console.log(error);
    });
});

db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
        var len = results.rows.length;

        for (var i = 0; i < len; i++) {
            alert(results.rows.item(i).log);
        }

    }, null);
});*/