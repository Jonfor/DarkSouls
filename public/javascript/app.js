var startSound = new Audio('./public/assets/start.mp3');
var parrySound1 = new Audio('./public/assets/parry.mp3');
var parrySound2 = new Audio('./public/assets/parry.mp3');

function playBodyIsReady() {
    startSound.play();

    document.getElementById('bodyIsReady').setAttribute("disabled", "true");
    document.getElementById('human').checked = false;
    document.getElementById('ring').checked = false;
    sessionStorage.setItem('isHuman', false);
    sessionStorage.setItem('isRing', false);
}

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

function isBodyReady() {
    if (sessionStorage.getItem('isHuman') && sessionStorage.getItem('isRing')) {
        document.getElementById('bodyIsReady').removeAttribute("disabled");
    } else {
        document.getElementById('bodyIsReady').setAttribute("disabled", "true");
    }
}


