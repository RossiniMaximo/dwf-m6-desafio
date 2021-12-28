import * as express from "express";
import { nanoid } from "nanoid";
import { firestore, rtdb } from "./db";
import * as cors from "cors";
import * as path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
const port = process.env.PORT || 3001;

const usersCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

// Este me registra en la base de datos

app.post("/signup", function (req, res) {
  const { userName } = req.body;
  usersCollection
    .where("name", "==", userName)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.empty) {
        usersCollection
          .add({
            userName,
          })
          .then((newUserDocumented) => {
            res.json({
              message: "User created succesfully!",
              id: newUserDocumented.id,
            });
          });
      } else {
        res.status(400).json({
          message: "User already exists!",
        });
      }
    });
});

// Este me autentica ante la db

app.post("/auth", (req, res) => {
  const { userName } = req.body;
  usersCollection
    .where("userName", "==", userName)
    .get()
    .then((userDocument) => {
      if (userDocument) {
        const documentId = userDocument.docs[0].id;
        res.json({
          id: documentId,
        });
      } else {
        res.status(404).json({
          message: "User already exists!",
        });
      }
    });
});

// este me da el id simple

app.post("/rooms", function (req, res) {
  const { userId, userName } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        const roomReference = rtdb.ref("rooms/" + nanoid());
        roomReference
          .set({
            player1: {
              userId,
              userName,
              score: 0,
              ready: "",
              move: "",
              win: "",
              playAgain: "",
            },
            player2: {
              userName: "",
              player2Id: "",
              score: 0,
              move: "",
              ready: "",
              win: "",
              playAgain: "",
            },
            owner: userId,
          })
          .then((rtdbResponse) => {
            const longRoomId = roomReference.key;
            const simpleRoomId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(simpleRoomId.toString())
              .set({
                rtdbRoomId: longRoomId,
                owner: userId,
              })
              .then(() => {
                res.json({
                  id: simpleRoomId.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "You are not authorized!",
        });
      }
    });
});

// Tengo que crear el endpoint para el player1(listo)
//  y sus métodos en el estado

app.post("/rooms/:rtdbRoomId/player1", function (req, res) {
  const { rtdbRoomId } = req.params;
  const { ready, move, win, score, playAgain } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/player1");
  roomRef.update(
    {
      ready,
      move,
      win,
      score,
      playAgain,
    },
    () => {
      res.status(200).json("player1 properties has been updated!");
    }
  );
});
// Este endpoint modifica las propiedades del player 2 creadas previamente en cada room.

app.post("/rooms/:rtdbRoomId/player2", function (req, res) {
  const { rtdbRoomId } = req.params;
  const { userName, player2Id, ready, move, win, score, playAgain } = req.body;
  const roomRef = rtdb.ref("/rooms/" + rtdbRoomId + "/player2");

  roomRef.update(
    {
      userName,
      player2Id,
      ready,
      move,
      win,
      score,
      playAgain,
    },
    () => {
      res.status(200).json("player2 properties has been updated!");
    }
  );
});

// Este me deja acceder a los rooms usando el userId y el roomId

app.get("/rooms/:roomId", function (req, res) {
  const { roomId } = req.params;
  const { userId } = req.query;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        roomsCollection
          .doc(roomId.toString())
          .get()
          .then((roomDocumentSnapshot) => {
            const data = roomDocumentSnapshot.data();
            res.json(data);
          });
      } else {
        res.status(404).json({
          message: "You are not authorized to enter the room!",
        });
      }
    });
});
/* const rutaRelativa = path.resolve(path.join(__dirname, "/dist/index.html")); */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../dist/index.html")));
});
app.listen(port, () => {
  console.log("app listening port: " + port);
});
