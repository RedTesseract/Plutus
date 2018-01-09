// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        document.addEventListener('pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        document.addEventListener('offline', onNetworkFail.bind(this), false);

        $("#loginForm").fadeIn(500);

        var parentElement = document.getElementById('deviceready');
        $('.ui.radio.checkbox').checkbox();

        if (navigator.connection.type === Connection.UNKNOWN || navigator.connection.type === Connection.NONE) {
            onNetworkFail();
        }

        $("#loginBtn").click(function () {
            if (navigator.connection.type == Connection.UNKNOWN || navigator.connection.type == Connection.NONE) {
                DBGetAll("Type", "user", displayLocalUsers);

                $("#onlineForm").fadeOut(250, function () {
                    $("#offlineForm").fadeIn(500);
                });
                onNetworkFail();

                $("#btnDiv").fadeOut(250, function () {
                    $("#btnOfflineDiv").fadeIn(500);
                });
            } else {
                loginCallOnline();
            }

            /*$("#loginForm").fadeOut(1000, function () {
                $("#loadingDiv").fadeIn(1000);

                sleep(3000).then(() => {
                    //var utterance = new SpeechSynthesisUtterance('Welcome to Plutus');
                    //window.speechSynthesis.speak(utterance);
                    window.location.href = '/index.html';
                });
            });*/
        });

        $("#localUsersList").on("click", "div", function () {
            $("#username").text($(this).text());
        });

        $("#btnOfflineBack").click(function () {
            location.reload();
        });

        $("#loginOfflineBtn").click(function () {
            loginCallOffline();
        });

        $("#errorNetworkDiv").click(function () {
            $("#errorNetworkDiv").hide();
        });

        $("#errorRegDiv").click(function () {
            $("#errorRegDiv").hide();
        });

        $("#registerFormBtn").click(function () {
            $("#errorLoginDiv").hide();
            $("#logoDiv").transition('fly down');
            $("#loginForm").transition('fly down');

            //$("#registerForm").show();
            $('#registerForm').transition('fly up');
        });

        $("#regNext1").click(function () {
            var username = $('#regUsername').val();
            var password = $('#regPassword').val();
            var passwordConfirm = $('#regPasswordConfirm').val();

            if (!username || !password || !passwordConfirm) {
                $("#errorRegText").text("Please fill all data!");
                $("#errorRegDiv").transition('pulse');
            } else {
                $("#errorRegDiv").hide();
                if (password !== passwordConfirm) {
                    $("#errorRegText").text("Password doesn't match!");
                    $("#errorRegDiv").transition('pulse');
                } else {
                    $('#regProgress').progress({ percent: 33 });

                    $("#regNext1").hide();
                    $("#regNext2").show();

                    $("#regSeg1").fadeOut(250, function () {
                        $("#regSeg2").fadeIn(250);
                    });

                    $("#regStep1").transition('pulse');
                    $("#regStep1").hide();
                    $("#regStep2").transition('pulse');
                }
            }
        });

        $("#regNext2").click(function () {
            $("#errorRegDiv").hide();
            $('#regProgress').progress({ percent: 66 });

            $("#regNext2").hide();
            $("#regNext3").show();

            $("#regSeg2").fadeOut(250, function () {
                $("#regSeg3").fadeIn(250);
            });

            $("#regStep2").transition('pulse');
            $("#regStep2").hide();
            $("#regStep3").transition('pulse');
        });

        $("#regNext3").click(function () {
            $('#regProgress').progress({ percent: 100 });

            $("#regSeg3").fadeOut(250, function () {
                $("#regSeg4").fadeIn(250);
            });

            $("#regStep3").transition('pulse');
            $("#regStep3").hide();
            $("#regStep4").transition('pulse');

            var newUser = {
                username: $('#regUsername').val(),
                password: $('#regPassword').val(),
                age: $('#regAge').val(),
                profession: $('#regProfession').val(),
                currency: $('#regCurrency').val(),
                syncVersion: (new Date()).toJSON()
            };
            registerCall(newUser);
        });

        $("#regBack").click(function () {
            $("#regNext1").show();
            $("#regNext2").hide();
            $("#regNext3").hide();
            $("#regNext4").hide();
            $("#regSegError").hide();

            $("#regSeg2").hide();
            $("#regSeg3").hide();
            $("#regSeg4").hide();
            $("#regSeg1").show();

            $("#regStep4").transition('pulse');
            $("#regStep4").hide();
            $("#regStep1").transition('pulse');
            /*$("#regStep1").removeClass("grey");
            $("#regStep1").addClass("blue");

            $("#regStep2").removeClass("inverted");
            $("#regStep2").removeClass("blue");
            $("#regStep2").removeClass("grey");

            $("#regStep3").removeClass("inverted");
            $("#regStep3").removeClass("blue");
            $("#regStep3").removeClass("grey");*/
        });

        $("#regBackLogin").click(function() {
            location.reload();
        });
};

    /*function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }*/

    function guid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function loginCallOnline() {
        var username = $('#username').val();
        var password = $('#password').val();

        var storage = window.localStorage;
        var sessionId = storage.getItem('sessionId');

        if (!sessionId) {
            sessionId = guid();
            storage.setItem('sessionId', sessionId);
        }

        var url = "https://dik.space/api/login";

        $("#loginForm").fadeOut(500, function () {
            $("#loadingDiv").fadeIn(500);

            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: JSON.stringify({ session: sessionId, username: username, password: password }),
                success: function (jsonData) {
                    if (jsonData.response === "200" &&
                        jsonData.session === sessionId &&
                        jsonData.username === username &&
                        jsonData.password === password) {

                        storage.setItem('username', username);
                        storage.setItem('password', password);
                        storage.setItem('syncVersion', jsonData.syncVersion);

                        window.location.href = '/index.html';
                    } else {
                        //alert("Error unutra");
                        showLoginError();
                    }
                },
                error: function (jsonData) {
                    //alert("Error vani");
                    showLoginError();
                }
            });
        });
    }

    function loginCallOffline() {
        var username = $('#username').val();
        var password = $('#password').val();

        var storage = window.localStorage;
        var sessionId = storage.getItem('sessionId');

        if (!sessionId) {
            sessionId = guid();
            storage.setItem('sessionId', sessionId);
            storage.setItem('username', username);
            storage.setItem('password', password);
        }

        $("#loginForm").fadeOut(250, function () {
            $("#loadingDiv").fadeIn(500);

            //TODO check login
            //DBGetAll("Type", "user", displayLocalUsers);
        });
    }

    function displayLocalUsers(data) {
        //$("#localUsersList").remove();
        //$("#localUsersList").append('<div class="item">test</div>');

        $.each(data, function (i, item) {
            $("#localUsersList").append('<div class="item userListItem">' + item.username + '</div>');
        });
    }

    function registerCall(newUser) {
        var url = "https://dik.space/api/register";

            $.ajax({
                type: "POST",
                url: url,
                dataType: 'json',
                data: JSON.stringify(newUser),
                success: function (jsonData) {
                    if (jsonData.response === "200") {
                        //TODO add user data to idb
                        //var obj = { type: "user", username: "cuka", password: "test", age: 24, profession: "smetlar", currency: "HRK" };
                        DBInsertObject(newUser);

                        window.location.href = '/index.html';
                    } else {
                        showRegistrationError();
                    }
                },
                error: function (jsonData) {
                    showRegistrationError();
                }
            });
    }

    function showRegistrationError() {
        /*$("#regSeg4").fadeOut(250, function () {
            $("#regSegError").fadeIn(250);
        });*/

        $("#regNext3").hide();
        $("#regSeg4").hide();
        $("#regSegError").show();

        $("#regBack").hide();
        $("#regBackLogin").show();
    }

    function showLoginError() {
        localStorage.removeItem('sessionId');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('syncVersion');

        $("#loadingDiv").fadeOut(250, function () {
            $("#errorLoginDiv").fadeIn(250);
            $("#loginForm").fadeIn(500);
        });
    }

    function onNetworkFail() {
        $("#errorNetworkDiv").fadeIn(250);
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();