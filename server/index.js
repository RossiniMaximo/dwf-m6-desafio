"use strict";
exports.__esModule = true;
var express = require("express");
var nanoid_1 = require("nanoid");
var db_1 = require("./db");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
var port = process.env.PORT || 3001;
var usersCollection = db_1.firestore.collection("users");
var roomsCollection = db_1.firestore.collection("rooms");
// Este me registra en la base de datos
app.post("/signup", function (req, res) {
    var userName = req.body.userName;
    usersCollection
        .where("name", "==", userName)
        .get()
        .then(function (documentSnapshot) {
        if (documentSnapshot.empty) {
            usersCollection
                .add({
                userName: userName
            })
                .then(function (newUserDocumented) {
                res.json({
                    message: "User created succesfully!",
                    id: newUserDocumented.id
                });
            });
        }
        else {
            res.status(400).json({
                message: "User already exists!"
            });
        }
    });
});
// Este me autentica ante la db
app.post("/auth", function (req, res) {
    var userName = req.body.userName;
    usersCollection
        .where("userName", "==", userName)
        .get()
        .then(function (userDocument) {
        if (userDocument) {
            var documentId = userDocument.docs[0].id;
            res.json({
                id: documentId
            });
        }
        else {
            res.status(404).json({
                message: "User already exists!"
            });
        }
    });
});
// este me da el id simple
app.post("/rooms", function (req, res) {
    var userId = req.body.userId;
    var userName = req.body.userName;
    usersCollection
        .doc(userId.toString())
        .get()
        .then(function (userDoc) {
        if (userDoc.exists) {
            var roomReference_1 = db_1.rtdb.ref("rooms/" + (0, nanoid_1.nanoid)());
            roomReference_1
                .set({
                player1: {
                    userId: userId,
                    userName: userName,
                    score: 0,
                    ready: "",
                    move: "",
                    win: "",
                    playAgain: ""
                },
                player2: {
                    userName: "",
                    player2Id: "",
                    score: 0,
                    move: "",
                    ready: "",
                    win: "",
                    playAgain: ""
                },
                owner: userId
            })
                .then(function (rtdbResponse) {
                var longRoomId = roomReference_1.key;
                var simpleRoomId = 1000 + Math.floor(Math.random() * 999);
                roomsCollection
                    .doc(simpleRoomId.toString())
                    .set({
                    rtdbRoomId: longRoomId,
                    owner: userId
                })
                    .then(function () {
                    res.json({
                        id: simpleRoomId.toString()
                    });
                });
            });
        }
        else {
            res.status(401).json({
                message: "You are not authorized!"
            });
        }
    });
});
// Tengo que crear el endpoint para el player1(listo)
//  y sus métodos en el estado
app.post("/rooms/:rtdbRoomId/player1", function (req, res) {
    var rtdbRoomId = req.params.rtdbRoomId;
    var ready = req.body.ready;
    var move = req.body.move;
    var win = req.body.win;
    var score = req.body.score;
    var playAgain = req.body.playAgain;
    var roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/player1");
    roomRef.update({
        ready: ready,
        move: move,
        win: win,
        score: score,
        playAgain: playAgain
    }, function () {
        res.status(200).json("player1 properties has been updated!");
    });
});
// Este endpoint modifica las propiedades del player 2 creadas previamente en cada room.
app.post("/rooms/:rtdbRoomId/player2", function (req, res) {
    var rtdbRoomId = req.params.rtdbRoomId;
    var userName = req.body.userName;
    var player2Id = req.body.player2Id;
    var ready = req.body.ready;
    var move = req.body.move;
    var win = req.body.win;
    var score = req.body.score;
    var playAgain = req.body.playAgain;
    var roomRef = db_1.rtdb.ref("/rooms/" + rtdbRoomId + "/player2");
    roomRef.update({
        userName: userName,
        player2Id: player2Id,
        ready: ready,
        move: move,
        win: win,
        score: score,
        playAgain: playAgain
    }, function () {
        res.status(200).json("player2 properties has been updated!");
    });
});
// Este me deja acceder a los rooms usando el userId y el roomId
app.get("/rooms/:roomId", function (req, res) {
    var roomId = req.params.roomId;
    var userId = req.query.userId;
    usersCollection
        .doc(userId.toString())
        .get()
        .then(function (userDoc) {
        if (userDoc.exists) {
            roomsCollection
                .doc(roomId.toString())
                .get()
                .then(function (roomDocumentSnapshot) {
                var data = roomDocumentSnapshot.data();
                res.json(data);
            });
        }
        else {
            res.status(404).json({
                message: "You are not authorized to enter the room!"
            });
        }
    });
});
app.listen(port, function () {
    console.log("app listening port: " + port);
});
