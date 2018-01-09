// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);

        var sessionId = localStorage.getItem('sessionId');
        var username = localStorage.getItem('username');
        var password = localStorage.getItem('password');
        var syncVersion = localStorage.getItem('syncVersion');

        if (!sessionId || !username || !password || !syncVersion) {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('syncVersion');

            window.location.href = '/login.html';
        } else {
            DBGetAll("UsernameIndex", username, CompareSyncVersion);
        }

        /*var obj = { type: "budget", start_date: "2.1.2018", end_date: "4.1.2018", amount: 2000, balance: 1600 };
        DBInsertObject(obj);
        DBGetAll("TypeIndex", "budget", displayBudget);*/

        $('#navHome').click(function (event) {
            window.location.href = '/index.html';
        });

        $('#navBudget').click(function (event) {
            window.location.href = '/budget.html';
        });

        $('#navExpenses').click(function (event) {
            window.location.href = '/expenses.html';
        });

        $('#navSettings').click(function (event) {
            window.location.href = '/settings.html';
        });

        $('#navHelp').click(function (event) {
            window.location.href = '/help.html';
        });

        $('#navSignout').click(function (event) {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('syncVersion');

            window.location.href = '/login.html';
        });

        $("#sidebarBtn").click(function () {
            $('.ui.labeled.icon.sidebar').sidebar('toggle');
        });

        /*$("#testBtn").click(function () {
            var julius = new Julius({
                // log: true
            });

            julius.onrecognition = function (sentence) {
                alert("recognized");
                console.log('Sentence: ', sentence);
                document.getElementById('what-you-said').innerHTML = "test " + sentence;
            }
            julius.onfirstpass = function (sentence) {
                console.log('First pass: ', sentence);
            }
            julius.onfail = function () {
                alert("fail");
            }
            // This will only log if you pass `log: true` in the options object
            julius.onlog = function (log) {
                console.log(log);
            }
        });*/
    };

    function displayBudget(data) {
        alert(data.length);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();