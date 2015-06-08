var log = function(string) {
    console.log(string);
};

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

// Codenjoy server host ip
var hostIp = 'tetrisj.jvmhost.net';
var port = 12270;

// Your username
var userName = 'viktor_molokostov@epam.com';
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
    //log("submitted: " + result);

    ws.send(result);
});

var SIZE = 5;
var previousMsg = '';
var previousMove = '';
// The method which will be used to send commands to Codenjoy server

var vertical = function(i, msg){
    var indexes = [
        0 * SIZE + i,
        1 * SIZE + i,
        2 * SIZE + i,
        3 * SIZE + i,
        4 * SIZE + i
    ];
    var res = '';
    for (var j = 0; j < indexes.length; j++) {
        res += msg[indexes[j]];
    }
    //log('res vert: ' + res);
    return res;
}

var horisontal = function(i, msg){
    var res = msg.substr(i * SIZE, SIZE);
    //log('res horiz: ' + res);
    return res;
}



function answer(message) {
    var msg = message.replace('board=', '');

    var currentScore = 0;
    for (var i = 0; i < msg.length; i++) {
        if (dict.hasOwnProperty(msg[i])) {
            currentScore += dict[msg[i]];
        }
    }
    log('CURRENT: ' + currentScore);

    SIZE = Math.sqrt(msg.length);
    var verticalInfo = step(msg, vertical);
    var horizontalInfo = step(msg, horisontal);


    var move = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 4)] + "=1";

    if (horizontalInfo.score > verticalInfo.score) {
        if (previousMsg !== msg) {
            move = horizontalInfo.direction ? 'left=1' : 'right=1';
        }
    } else {
        if (previousMsg !== msg) {
            move = verticalInfo.direction ? 'up=1' : 'down=1';
        }
    }
    log(horizontalInfo.score + ' = ' + verticalInfo.score);
    previousMsg = msg;
    previousMove = move;
    return move;
}

function step(aString, callback) {
    var left = 0;
    var right = 0;
    var score = 0;
    for (var i = 0; i < SIZE; i++) {
        var scoreObject = calcScore(callback(i, aString));
        score += scoreObject.score;
        if (scoreObject.maxIndex > Math.round(SIZE / 2)) {
            left++;
        } else {
            right++;
        }
    }
    return {
        direction: left > right,
        score: score
    };
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


    for (var i = 0; i < noSpaces.length; i++) {
        numbers.push(dict[noSpaces[i]]);
    }
    return numbers;
};

function calcScore(list) {
    //log('list: ' + list);
    var noSpaces = withoutSpaces(list);

    var numbers = decode(noSpaces);



    var score = 0;
    var maxList = [];
    for (var i = 0; i < numbers.length-2; i++) {
        if (numbers[i] === numbers[i+1]) {
            var possibleScore = numbers[i] + numbers[i+1];
            if (possibleScore > score) {
                //score += possibleScore;
                score++;
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
