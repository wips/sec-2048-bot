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

var previousMsg = '';
// The method which will be used to send commands to Codenjoy server
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

var vertical = function(i, msg, SIZE){
    return msg[i * SIZE] +
        msg[i+1 * SIZE] +
        msg[i+2 * SIZE] +
        msg[i+3 * SIZE] +
        msg[i+4 * SIZE];
}

var horisontal = function(i, msg,SIZE){
    return msg.substr(i * SIZE, (i + 1) * SIZE);
}

function calcScore(line) {

    var noSpaces = withoutSpaces(line);
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
            maxList.push(numbers[i]);
        }
    }

    return {
        score: score,
        maxIndex: maxList.indexOf(Math.max(maxList))
    };
}

var calckDirectionScore = function(msg, msgSize, directionCalback){
    var oneDirection = 0;
    var otherDirection = 0;
    var directionScore = 0;
    var scoreObject = 0;
    
    for (var i = 0; i < msgSize; i++) {
        scoreObject = calcScore(directionCalback(i, msg, msgSize)).score;
        directionScore += scoreObject.score;
        if (scoreObject.maxIndex > Math.round(msgSize / 2)) {
            oneDirection++;
        } else {
           otherDirection++;
        }
    }
    
    return {
        oneDirection:oneDirection, 
        otherDirection:otherDirection
    };
    
}

var chooseDirection = function(vertical, horizontal, msg){
    if (horizontal > vertical) {
        if (previousMsg !== msg) {
            return horizontal.oneDirection > horizontal.otherDirection ? 'right=1' : 'left=1';
        }
    } else {
        if (previousMsg !== msg) {
            return  vertical.oneDirection  > vertical.otherDirection? 'up=1' : 'down=1';
        }
    }
   
   return  ['right', 'left', 'up', 'down'] [Math.floor(Math.random() * 4)] + "=1";
}


function answer(msg) {
    var SIZE = Math.sqrt(msg.length); //var SIZE = 5;
    
    var verticalScore = calckDirectionScore(msg, SIZE, vertical);
    var horizontalScore = calckDirectionScore(msg, SIZE, horisontal);
    
    var move = chooseDirection(verticalScore, horizontalScore, msg);    
    previousMsg = msg;    
    return move;
}






