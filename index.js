/**
 * Created by jonfor on 11/13/15.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var names = ['Kaka Karrotcake', 'Vergina', 'xXSupersandlegend69', 'Dani California', '420nosc0pe', 'Gilgamesh',
        'King David', 'Slim Shady', 'Jonfurry', 'Kristian Stewart', 'Googo', 'Freezy Pop', 'Lvl 70 ret pally lfg VC',
        'Danku Soulu', 'Soju is Vodka downed water', 'Bob Rober', 'Bob Ross', 'Master Cheef', 'Final Fantasy Money',
        'Michelle Cumella Obama', 'Lightning', 'Stan, your biggest fan', 'Edward Snowden is a hero',
        'Edward Snowden is a zero', 'Tay Zonday\'s Chocolate Rain', 'EXODIAAAAAAAAAAAA', 'Nico, your cousin', 'Dan Coach',
        'Dan Cooch', 'Dan Crotch', 'Crotchy', 'Koch Koch', 'Gilagan', 'MR. HAAAAAAAAAAAAAN', 'Android 69', 'Kappa Kappa Kappa'],
    userList = [];

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.username = getRandomName(userList);
    socket.on('body ready', function () {
        bodyIsReady(socket.username);
        io.emit('body ready', {userList: userList, username: socket.username});
    });

    socket.on('disconnect', function () {
        console.log("ded");
        console.log(socket.username);
        deleteUser(socket.username);
        io.emit('body dies', socket.username.replace(/\s+/g, ''));

    });

    io.emit('body lives', userList);
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function getRandomName() {
    // We store the username in the socket session for this client
    var name = names[Math.floor(Math.random() * names.length)];

    // Check if the name is taken already. Reroll if it is taken.
    while (userList.indexOf(name) > -1) {
        name = names[Math.floor(Math.random() * names.length)];
    }
    // Add the name to the used names list.
    userList.push(
        {
            name: name,
            isBodyReady: false
        }
    );

    return name;
}

function bodyIsReady(username) {
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].name === username) {
            userList[i].isBodyReady = true;
            break;
        }
    }
}

function deleteUser(username) {
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].name === username) {
            userList.splice(i, 1);
            break;
        }
    }
}