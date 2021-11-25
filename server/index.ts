import * as express from "express";
import { nanoid } from "nanoid";
import { firestore, rtdb } from "./db";
import * as cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

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
  const { name } = req.body;
  usersCollection
    .where("name", "==", name)
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
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((userDoc) => {
      if (userDoc.exists) {
        const roomReference = rtdb.ref("rooms/" + nanoid());
        roomReference
          .set({
            messages: ([] = []),
            owner: userId,
          })
          .then((rtdbResponse) => {
            const longRoomId = roomReference.key;
            const simpleRoomId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(simpleRoomId.toString())
              .set({
                rtdbRoomId: longRoomId,
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

// Este me deja acceder a los rooms usando el userId y el roomId

app.get("/rooms/:roomId", function (req, res) {
  const { userId } = req.query;
  const { roomId } = req.params;
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

app.listen(port, () => {
  console.log("app listening port: " + port);
});
