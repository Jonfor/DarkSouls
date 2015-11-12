var startSound = new Audio('./public/assets/start.mp3');
var parrySound1 = new Audio('./public/assets/parry.mp3');
var parrySound2 = new Audio('./public/assets/parry.mp3');

// Clear out the session items.
sessionStorage.setItem('isHuman', false);
sessionStorage.setItem('isRing', false);

function playHuman() {
    if (event.target.checked) {
        parrySound1.play();
        sessionStorage.setItem('isHuman', true);
    } else {
        sessionStorage.setItem('isHuman', false);
    }

    isBodyReady();
}

function playRing() {
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

    document.getElementById('bodyIsReady').setAttribute("disabled", "true");
    document.getElementById('human').checked = false;
    document.getElementById('ring').checked = false;
    sessionStorage.setItem('isHuman', false);
    sessionStorage.setItem('isRing', false);
}

function isBodyReady() {
    // We have to use JSON.parse because session/local storage converts everything to a string.
    // See https://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage
    var isHuman = JSON.parse(sessionStorage.getItem('isHuman')),
        isRing = JSON.parse(sessionStorage.getItem('isRing'));

    console.log(isHuman);
    console.log(isRing);
    if (isHuman && isRing) {
        document.getElementById('bodyIsReady').removeAttribute("disabled");
    } else {
        document.getElementById('bodyIsReady').setAttribute("disabled", "true");
    }
}


