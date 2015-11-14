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
    buildList(data.userList);

    // Remove readiness after 30 seconds.
    window.setTimeout(function () {
        var usernameNoSpace = data.username.replace(/\s+/g, '');
        var ele = $('#' + usernameNoSpace);
        ele.removeClass('ready');
        ele.text(data.username + '...is not ready!');
    }, 30000)
});

socket.on('body lives', function (userList) {
    buildList(userList);
});

socket.on('body dies', function (name) {
    $('#' + name).remove();
});

/**
 * Helper function that builds the DOM elements of the list.
 * Clear the current list and rebuild the whole thing. This is to have a consistent list for all users.
 * @param userList
 */
function buildList(userList) {
    var element = $('#messages');
    element.empty();
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].isBodyReady) {
            // Add the 'ready' text, the username (without spaces) as id, and the 'ready' class.
            element.append($('<li>').text(userList[i].name + '...is ready!').attr('id', userList[i].name.replace(/\s+/g, '')).addClass('ready'));
        } else {
            // Add the 'not ready' text and the username (without spaces) as id.
            element.append($('<li>').text(userList[i].name + '...is not ready!').attr('id', userList[i].name.replace(/\s+/g, '')));
        }

    }
}
