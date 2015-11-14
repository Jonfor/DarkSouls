var startSound = new Audio('./public/assets/start.mp3');
var parrySound1 = new Audio('./public/assets/parry.mp3');
var parrySound2 = new Audio('./public/assets/parry.mp3');

// Clear out the session items.
sessionStorage.setItem('isHuman', false);
sessionStorage.setItem('isRing', false);

function playHuman(event) {
    if (event.target.checked) {
        parrySound1.play();
        sessionStorage.setItem('isHuman', true);
    } else {
        sessionStorage.setItem('isHuman', false);
    }

    isBodyReady();
}

function playRing(event) {
    if (event.target.checked) {
        parrySound2.play();
        sessionStorage.setItem('isRing', true);
    } else {
        sessionStorage.setItem('isRing', false);
    }

    isBodyReady();
}

function playBodyIsReady() {
    startSound.play();

    $('#bodyIsReady').prop('disabled', true);
    $('#human').prop('checked', false);
    $('#ring').prop('checked', false);
    sessionStorage.setItem('isHuman', false);
    sessionStorage.setItem('isRing', false);

    socket.emit('body ready');
}

function isBodyReady() {
    // We have to use JSON.parse because session/local storage converts everything to a string.
    // See https://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
    var isHuman = JSON.parse(sessionStorage.getItem('isHuman')),
        isRing = JSON.parse(sessionStorage.getItem('isRing'));

    if (isHuman && isRing) {
        $('#bodyIsReady').removeAttr('disabled');
    } else {
        $('#bodyIsReady').prop('disabled', true);
    }
}

var socket = io();

socket.on('body ready', function (data) {
    console.log(data);
    buildList(data.userList);
});

socket.on('body lives', function (userList) {
    console.log(userList);
    buildList(userList);
});

socket.on('body dies', function (name) {
    $('#' + name).remove();
});

function buildList(userList) {
    var element = $('#messages');
    element.empty();
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].isBodyReady) {
            element.append($('<li>').text(userList[i].name + '...is ready!').attr('id', userList[i].name.replace(/\s+/g, '')).addClass('ready'));
        } else {
            element.append($('<li>').text(userList[i].name + '...is not ready!').attr('id', userList[i].name.replace(/\s+/g, '')));
        }

    }
}
