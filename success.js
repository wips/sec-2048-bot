var log = function(string) {
    console.log(string);
};



// Codenjoy server host ip
var hostIp = 'tetrisj.jvmhost.net';
var port = 12270;

// Your username
var userName = 'Kateryna_Zhavoronok@epam.com';
var gameUrl = 'codenjoy-contest/ws?';

var ws_url = 'ws://' + hostIp + ':' + port + '/' + gameUrl + 'user=' + userName;
var WebSocket = require('ws');
var _ = require('lodash');
log(ws_url);
var ws = new WebSocket(ws_url);

ws.on('open', function() {
    log('Opened');
});

ws.on('close', function() {
    log('Closed');
});

ws.on('message', function(message) {
    log('received: ' + message);

    var result = answer(message);
    log("submitted: " + result);

    ws.send(result);
});

var SIZE = 5;
var previousMsg = '';
var previousMove = '';
// The method which will be used to send commands to Codenjoy server

var vertical = function(i, msg){
    return msg[i * SIZE] +
        msg[i+1 * SIZE] +
        msg[i+2 * SIZE] +
        msg[i+3 * SIZE] +
        msg[i+4 * SIZE];
}

var horisontal = function(i, msg){
    return msg.substr(i * SIZE, (i + 1) * SIZE);
}



function answer(msg) {
    SIZE = Math.sqrt(msg.length);
    var horizontalScore = 0;
    var left = 0;
    var right = 0;
    var scoreObject = 0;
    for (var i = 0; i < SIZE; i++) {
        scoreObject = calcScore(horisontal(i, msg)).score;
        horizontalScore += scoreObject.score;
        if (scoreObject.maxIndex > 3) {
            right++;
        } else {
            left++;
        }
    }


    var up = 0;
    var down = 0;
    var verticalScore = 0;
    for (i = 0; i < SIZE; i++) {
        scoreObject = calcScore(vertical(i, msg)).score;
        verticalScore += scoreObject.score;
        if (scoreObject.maxIndex > Math.round(SIZE / 2)) {
            up++;
        } else {
            down++;
        }
    }


    var move = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 4)] + "=1";

    if (horizontalScore > verticalScore) {
        if (previousMsg !== msg) {
            move = right > left ? 'right=1' : 'left=1';
        }
    } else {
        if (previousMsg !== msg) {
            move = up > down ? 'up=1' : 'down=1';
        }
    }
    log(previousMsg + ' = ' + msg);
    previousMsg = msg;
    previousMove = move;
    return move;
}


var withoutSpaces = function(list){
    var noSpaces = [];

    for (var i = 0; i < list.length; i++) {
        if (list[i] === '') {
            continue;
        }
        noSpaces.push(list[i]);
    }

    return noSpaces;
};
var decode = function(noSpaces){
    var numbers = [];
    var dict = {
        'x': 0,
        '2': 2,
        '4': 4,
        '8': 8,
        'A': 16,
        'B': 32,
        'C': 64,
        'D': 128,
        'E': 256,
        'F': 512,
        'G': 1024,
        'H': 2048,
        'I': 4096,
        'J': 8192,
        'K': 16384,
        'L': 32768,
        'M': 65536,
        'N': 131072,
        'O': 262144,
        'P': 524288,
        'Q': 1048566,
        'R': 2097152,
        'S': 4194304
    };

    for (var i = 0; i < noSpaces.length; i++) {
        numbers.push(dict[noSpaces[i]]);
    }
    return numbers;
};

function calcScore(list) {

    var noSpaces = withoutSpaces(list);

    var numbers = decode(noSpaces);

    var score = 0;
    var maxList = [];
    for (var i = 0; i < numbers.length-1; i++) {
        if (numbers[i] === numbers[i+1]) {
            var possibleScore = numbers[i] * numbers[i];
            if (possibleScore > score) {
                score += possibleScore;
            }
            maxList.push(possibleScore);
        } else {
            //score += numbers[i];
            maxList.push(numbers[i]);
        }
    }


    return {
        score: score,
        maxIndex: maxList.indexOf(Math.max(maxList))
    };
}
