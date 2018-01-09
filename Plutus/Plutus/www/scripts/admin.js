var localVersion = null;
var serverVersion = new Date();

function CompareSyncVersion(data) {
    if (data.length !== 1) {
        return;
    } else {
        localVersion = new Date(data[0].syncVersion);
        serverVersion = new Date(localStorage.getItem('syncVersion'));

        if (serverVersion === localVersion) {
            return;
        } else if (serverVersion > localVersion) {
            SyncServerToLocal();
        } else {
            SyncLocalToServer();
        }
    }
}

function SyncLocalToServer() {
    var sessionId = localStorage.getItem('sessionId');
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if (!sessionId || !username || !password) {
        alert("Error syncing: local credentials");
    } else {
        DBGetAll("Type", "budget", PerformSync);
        DBGetAll("Type", "expense", PerformSync);
    }
}

function PerformSync(data) {
    var url = "https://dik.space/api/synclocal";

    var sessionId = localStorage.getItem('sessionId');
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if (!sessionId || !username || !password) {
        alert("Error syncing: local credentials");
    } else {
        var filteredData = [];

        $.each(data, function (i, item) {
            var creationDate = new Date(item.creation_date);
            if (creationDate > serverVersion) {
                filteredData.push(item);
            }
        });

        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: JSON.stringify({ session: sessionId, username: username, password: password, version: localVersion, newData: filteredData}),
            success: function (jsonData) {
                if (jsonData.response === "200" &&
                    jsonData.session === sessionId &&
                    jsonData.username === username &&
                    jsonData.password === password) {

                    //TODO notify user
                    alert("Sync local to server successful!");
                } else {
                    alert("Error syncing: credential check");
                }
            },
            error: function (jsonData) {
                alert("Error syncing: contacting server");
            }
        });
    }
}

function SyncServerToLocal() {
    var url = "https://dik.space/api/syncserver";

    var sessionId = localStorage.getItem('sessionId');
    var username = localStorage.getItem('username');
    var password = localStorage.getItem('password');

    if (!sessionId || !username || !password) {
        alert("Error syncing: local credentials");
    } else {
        $.ajax({
            type: "POST",
            url: url,
            dataType: 'json',
            data: JSON.stringify({ session: sessionId, username: username, password: password, version: localVersion }),
            success: function (jsonData) {
                if (jsonData.userdata.response === "200" &&
                    jsonData.userdata.session === sessionId &&
                    jsonData.userdata.username === username &&
                    jsonData.userdata.password === password) {

                    $.each(jsonData.newData, function (i, item) {
                        DBInsertObject(item);
                    });
                } else {
                    alert("Error syncing: credential check");
                }
            },
            error: function (jsonData) {
                alert("Error syncing: contacting server");
            }
        });
    }
}