// 此範例需建立多個Canvas, 因此建立一個工廠函式
// 函式僅用於生產畫布，與主題無直接關係
function Canvas(width, height) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return [canvas, canvas.getContext('2d')]
}

// Helpers

function random(max, min) {
    if (typeof max !== 'number') {
        return Math.random();
    } else if (typeof min !== 'number') {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}

// keyStatus

var keyStatus = {
    up: false,
    down: false,
    left: false,
    right: false,
}

// player

var playerValue = {
    x: 200,
    y: 400,
    vx: 0,
    vy: 0,
    status: 'idle',
    nextCountdown: 0,
    nextStatus: 'idle',
    frame: 0,
    face: 'left',
}

// img

var imgValue = {
    width: 180,
    height: 180,
}

var imgSet = {
    idle: {
        file: [],
        animation: [],
        animationValue: [],
        anim_positionX: [],
        anim_positionY: [],
    },
    turn: {
        file: [],
        animation: [],
        animationValue: [],
        anim_positionX: [],
        anim_positionY: [],
    },
    walk: {
        file: [],
        animation: [],
        animationValue: [],
        anim_positionX: [],
        anim_positionY: [],
    },
    lookupHalf: {
        file: [],
        animation: [],
        animationValue: [],
        anim_positionX: [],
        anim_positionY: [],
    },
    lookup: {
        file: [],
        animation: [],
        animationValue: [],
        anim_positionX: [],
        anim_positionY: [],
    },
}


for (let i = 1; i <= 4; i++) {
    myImg = new Image();
    myImg.src = 'img/I0' + i + '.png';
    imgSet.idle.file.push(myImg);
}
imgSet.idle.animationValue = [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
imgSet.idle.anim_positionX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
imgSet.idle.anim_positionY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < imgSet.idle.animationValue.length; i++) {
    imgSet.idle.animation.push(imgSet.idle.file[imgSet.idle.animationValue[i]]);
}

for (let i = 1; i <= 3; i++) {
    myImg = new Image();
    myImg.src = 'img/T0' + i + '.png';
    imgSet.turn.file.push(myImg);
}
imgSet.turn.animationValue = [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2];
imgSet.turn.anim_positionX = [0];
imgSet.turn.anim_positionY = [0];
for (let i = 0; i < imgSet.turn.animationValue.length; i++) {
    imgSet.turn.animation.push(imgSet.turn.file[imgSet.turn.animationValue[i]]);
}

for (let i = 1; i <= 6; i++) {
    myImg = new Image();
    myImg.src = 'img/W0' + i + '.png';
    imgSet.walk.file.push(myImg);
}
imgSet.walk.animationValue = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 4, 4];
imgSet.walk.anim_positionX = [0];
imgSet.walk.anim_positionY = [0, 0, 0, 0, 0, 0, 0, 0, -2, -2, -2, -2, -4, -4, -4, -4, -6, -6, -6, -6, -6, -6, -6, -6, -4, -4, -4, -4, -2, -2, -2, -2];
for (let i = 0; i < imgSet.walk.animationValue.length; i++) {
    imgSet.walk.animation.push(imgSet.walk.file[imgSet.walk.animationValue[i]]);
}

for (let i = 1; i <= 1; i++) {
    myImg = new Image();
    myImg.src = 'img/U01.png';
    imgSet.lookupHalf.file.push(myImg);
}
imgSet.lookupHalf.animationValue = [0, 0, 0, 0];
imgSet.lookupHalf.anim_positionX = [0];
imgSet.lookupHalf.anim_positionY = [0];
for (let i = 0; i < imgSet.lookupHalf.animationValue.length; i++) {
    imgSet.lookupHalf.animation.push(imgSet.lookupHalf.file[imgSet.lookupHalf.animationValue[i]]);
}

for (let i = 1; i <= 1; i++) {
    myImg = new Image();
    myImg.src = 'img/U02.png';
    imgSet.lookup.file.push(myImg);
}
imgSet.lookup.animationValue = [0];
imgSet.lookup.anim_positionX = [0];
imgSet.lookup.anim_positionY = [0];
for (let i = 0; i < imgSet.lookup.animationValue.length; i++) {
    imgSet.lookup.animation.push(imgSet.lookup.file[imgSet.lookup.animationValue[i]]);
}


var canvasMainValue = {
    width: 600,
    height: 600,
}

const [canvasMain, ctxMain] = Canvas(canvasMainValue.width, canvasMainValue.height);
document.getElementById('main').appendChild(canvasMain);
ctxMain.imageSmoothingEnabled = false
const [canvasPlayer, ctxPlayer] = Canvas(90, 90);
ctxPlayer.imageSmoothingEnabled = false
const [canvasDirectionSign, ctxDirectionSign] = Canvas(90, 90);
ctxDirectionSign.imageSmoothingEnabled = false


window.addEventListener('load', function () {
    this.window.addEventListener('keydown', myKeyDown);
    this.window.addEventListener('keyup', myKeyUp);
    canvasMain.addEventListener('mousedown', myMouseDown);
    canvasMain.addEventListener('mousemove', myMouseMove);
});

function myKeyDown(e) {
    var keyID = e.code;
    if (e.repeat == false) {
        if (keyID == "ArrowLeft") {
            keyStatus.left = true;
            if (playerValue.status == 'turn') {

            }
            else {
                if (playerValue.face == 'right') {
                    playerChangeStatus('turn');
                    playerValue.nextCountdown = 12;
                    playerValue.nextStatus = 'walk';
                }
                else if (playerValue.face == 'left') {
                    playerChangeStatus('walk');
                }
            }
        }
        else if (keyID == "ArrowRight") {
            keyStatus.right = true;
            if (playerValue.status == 'turn') {

            }
            else {
                if (playerValue.face == 'left') {
                    playerChangeStatus('turn');
                    playerValue.nextCountdown = 12;
                    playerValue.nextStatus = 'walk';
                }
                else if (playerValue.face == 'right') {
                    playerChangeStatus('walk');
                }
            }
        }
        else if (keyID == "ArrowUp") {
            keyStatus.up = true;
            if (playerValue.status == 'idle') {
                playerChangeStatus('lookupHalf');
                playerValue.nextCountdown = 4;
                playerValue.nextStatus = 'lookup';
            }

        }
        else if (keyID == "Space") {
        }
    }
}
function myKeyUp(e) {
    var keyID = e.code;
    if (keyID == "ArrowLeft") {
        keyStatus.left = false;
        if (playerValue.status == 'turn') {
            playerValue.nextStatus = 'idle';
        }
        else {
            if (playerValue.face == 'right') {

            }
            else {
                playerChangeStatus('idle');
            }
        }

    }
    else if (keyID == "ArrowRight") {
        keyStatus.right = false;
        if (playerValue.status == 'turn') {
            playerValue.nextStatus = 'idle';
        }
        else {
            if (playerValue.face == 'left') {

            }
            else {
                playerChangeStatus('idle');
            }
        }
    }
    else if (keyID == "ArrowUp") {
        keyStatus.up = false;
        if (playerValue.status == 'lookupHalf' || playerValue.status == 'lookup') {
            playerChangeStatus('lookupHalf');
            playerValue.nextCountdown = 4;
            playerValue.nextStatus = 'idle';
        }
    }
    else if (keyID == "Space") {
    }
}
function myKeyInterval() {
    if (keyStatus.left && !keyStatus.right) {
        if (playerValue.status == 'idle') {
            if (playerValue.face == 'right') {
                playerChangeStatus('turn');
                playerValue.nextCountdown = 12;
                playerValue.nextStatus = 'walk';
            }
            else if (playerValue.face == 'left') {
                playerChangeStatus('walk');
            }
        }
    }
    if (!keyStatus.left && keyStatus.right) {
        if (playerValue.status == 'idle') {
            if (playerValue.face == 'left') {
                playerChangeStatus('turn');
                playerValue.nextCountdown = 12;
                playerValue.nextStatus = 'walk';
            }
            else if (playerValue.face == 'right') {
                playerChangeStatus('walk');
            }
        }
    }
    if (!keyStatus.left && !keyStatus.right && keyStatus.up) {
        if (playerValue.status == 'idle') {
            playerChangeStatus('lookupHalf');
            playerValue.nextCountdown = 4;
            playerValue.nextStatus = 'lookup';
        }
    }
}

function myMouseDown(e) {

}
function myMouseMove(e) {
    let thisX = e.pageX - canvasMain.offsetLeft;
    let thisY = e.pageY - canvasMain.offsetTop;
}

function nowPlayerImage() {
    // console.log(imgSet[playerValue.status].anim_positionX[playerValue.frame % imgSet[playerValue.status].anim_positionX.length]);
    return {
        img: imgSet[playerValue.status].animation[playerValue.frame % imgSet[playerValue.status].animation.length],
        x: imgSet[playerValue.status].anim_positionX[playerValue.frame % imgSet[playerValue.status].anim_positionX.length],
        y: imgSet[playerValue.status].anim_positionY[playerValue.frame % imgSet[playerValue.status].anim_positionY.length],
    }
}

function playerChangeStatus(status) {
    playerValue.status = status;
    playerValue.frame = 0;
}

function playerStatusRun() {
    if (playerValue.status == 'walk') {
        if (playerValue.face == 'left') {
            playerValue.vx = -4;
        }
        else if (playerValue.face == 'right') {
            playerValue.vx = 4;
        }
        else {
            playerValue.vx = 0;
        }
    }
    else {
        playerValue.vx = 0;
    }

    playerValue.x += playerValue.vx;
    playerValue.y += playerValue.vy;
}

function playerStatusAutoChange() {
    if (playerValue.status == 'turn' && playerValue.nextCountdown <= 0) {
        playerChangeStatus(playerValue.nextStatus);
        if (playerValue.face == 'left') {
            playerValue.face = 'right';
        }
        else if (playerValue.face == 'right') {
            playerValue.face = 'left';
        }
    }
    if (playerValue.status == 'lookupHalf' && playerValue.nextCountdown <= 0) {
        playerChangeStatus(playerValue.nextStatus);
    }
}

function drawDirectionSign() {
    ctxDirectionSign.clearRect(0, 0, 90, 90);
    ctxDirectionSign.globalCompositeOperation = 'source-over';
    ctxDirectionSign.fillStyle = "rgb(0,0,255)";
    ctxDirectionSign.fillRect(30, 30, 30, 30);
    ctxDirectionSign.fillStyle = "rgb(0,0,128)";
    if (keyStatus.up) {
        ctxDirectionSign.fillRect(30, 0, 30, 30);
    }
    if (keyStatus.down) {
        ctxDirectionSign.fillRect(30, 60, 30, 30);
    }
    if (keyStatus.left) {
        ctxDirectionSign.fillRect(0, 30, 30, 30);
    }
    if (keyStatus.right) {
        ctxDirectionSign.fillRect(60, 30, 30, 30);
    }
}

function drawChi() {

    ctxMain.clearRect(0, 0, canvasMainValue.width, canvasMainValue.height);
    ctxMain.globalCompositeOperation = 'source-over';
    ctxMain.fillStyle = "rgb(225,225,225)";
    ctxMain.fillRect(0, 0, canvasMainValue.width, canvasMainValue.height);
    ctxMain.fillRect(0, 0, canvasMainValue.width, canvasMainValue.height);
    ctxPlayer.clearRect(0, 0, 90, 90);

    myKeyInterval();
    playerStatusRun();


    if (playerValue.face == 'right') {

        ctxPlayer.scale(-1, 1); //左右镜像翻转
        ctxPlayer.translate(-90, 0);
        ctxPlayer.drawImage(nowPlayerImage().img, 0, 0, 90, 90);
        ctxPlayer.scale(-1, 1); //左右镜像翻转
        ctxPlayer.translate(-90, 0);
    }
    else {
        ctxPlayer.drawImage(nowPlayerImage().img, 0, 0, 90, 90);
    }


    if (playerValue.face == 'left') {
        ctxMain.drawImage(canvasPlayer, playerValue.x + nowPlayerImage().x, playerValue.y + nowPlayerImage().y, imgValue.width, imgValue.height);
    }
    else if (playerValue.face == 'right') {
        ctxMain.drawImage(canvasPlayer, playerValue.x - nowPlayerImage().x, playerValue.y + nowPlayerImage().y, imgValue.width, imgValue.height);
    }

    playerValue.frame++;
    playerValue.nextCountdown--;
    playerStatusAutoChange();

    drawDirectionSign();
    ctxMain.drawImage(canvasDirectionSign, 30, 30, 90, 90);
}

setInterval(drawChi, 15);
