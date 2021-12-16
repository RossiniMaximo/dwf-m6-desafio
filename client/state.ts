import { rtdb } from "./db";
import { map } from "lodash";
type Move = "tijeras" | "papel" | "piedra";
type Game = {
  playerMove: Move;
  computerMove: Move;
};
const API_URL = "http://localhost:3001";
const state = {
  data: {
    currentGame: {
      playerMove: "",
      player2Move: "",
    },
    imInPageRules: "",
    imInPageWaitingRoom: "",
    imInResultPage: "",
    userName: "",
    player2Name: "",
    signName: "",
    userId: "",
    player2Id: "",
    playAgainPlayer1: "",
    playAgainPlayer2: "",
    player2winner: "",
    player1Winner: "",
    imPlayer2: "",
    imPlayer1: "",
    readyPlayer1: "",
    readyPlayer2: "",
    roomId: "",
    rtdbRoomId: "",
    winner: "",
    playerScore: 0,
    player2Score: 0,
  },
  listeners: [],
  refreshListener: [],
  scoreCounter(winner) {
    const newState = state.getState();
    if (winner === "player") {
      newState.playerScore++;
    }
    if (winner === "player2") {
      newState.player2Score++;
    }

    state.setState(newState);
  },
  getState(callback?) {
    if (callback) {
      callback();
    }
    return this.data;
  },
  setState(newState) {
     localStorage.setItem("user-data", JSON.stringify(newState));
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("soy el state he cambiado", newState);
    console.log("soy los listeners del estado :", this.listeners);
  },
  initStorage() {
    const localdata = localStorage.getItem("user-data");
    console.log("soy la localdata : ", localdata);
    if (localdata == "null" || null) {
      return this.setState({
        data: {
          currentGame: {
            playerMove: "",
            player2Move: "",
          },
          imInPageRules: "",
          imInPageWaitingRoom: "",
          imInResultPage: "",
          userName: "",
          player2Name: "",
          userId: "",
          player2Id: "",
          playAgainPlayer1: "",
          playAgainPlayer2: "",
          player2winner: "",
          player1Winner: "",
          imPlayer2: "",
          imPlayer1: "",
          readyPlayer1: "",
          readyPlayer2: "",
          roomId: "",
          rtdbRoomId: "",
          winner: "",
          playerScore: 0,
          player2Score: 0,
        },
      });
    } else {
      return state.setState(JSON.parse(localdata));
    }
  },
  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },

  setMove(move: Move) {
    const currentState = this.getState();
    currentState.currentGame.playerMove = move;
  },
  setPlayer2Move(move: Move) {
    const currentState = this.getState();
    currentState.currentGame.player2Move = move;
  },
  result() {
    const cs = this.getState();

    const ganePiedra =
      cs.currentGame.playerMove == "piedra" &&
      cs.currentGame.player2Move == "tijeras";
    const playerPiedraContraNada =
      cs.currentGame.player2Move == "" && cs.currentGame.playerMove == "piedra";
    const ganePapel =
      cs.currentGame.playerMove == "papel" &&
      cs.currentGame.player2Move == "piedra";
    const playerPapelContraNada =
      cs.currentGame.player2Move == "" && cs.currentGame.playerMove == "papel";
    const ganeTijeras =
      cs.currentGame.playerMove == "tijeras" &&
      cs.currentGame.player2Move == "papel";
    const playerTijerasContraNada =
      cs.currentGame.playerMove == "tijeras" &&
      cs.currentGame.player2Move == "";
    const gano = [
      ganePiedra,
      playerPiedraContraNada,
      ganePapel,
      playerPapelContraNada,
      ganeTijeras,
      playerTijerasContraNada,
    ].includes(true);
    if (gano == true) {
      cs.winner = "player1";
    } else {
      if (cs.currentGame.player2Move != "") {
        cs.winner = "player2";
      }
    }

    const player2Piedra =
      cs.currentGame.player2Move == "piedra" &&
      cs.currentGame.playerMove == "tijeras";
    const player2PiedraContraNada =
      cs.currentGame.playerMove == "" && cs.currentGame.player2Move == "piedra";
    const player2Papel =
      cs.currentGame.playerMove == "piedra" &&
      cs.currentGame.player2Move == "papel";
    const player2PapelContraNada =
      cs.currentGame.playerMove == "" && cs.currentGame.player2Move == "papel";
    const player2Tijeras =
      cs.currentGame.playerMove == "papel" &&
      cs.currentGame.player2Move == "tijeras";
    const player2TijerasContraNada =
      cs.currentGame.playerMove == "" &&
      cs.currentGame.player2Move == "tijeras";
    const player2Gana = [
      player2Piedra,
      player2Papel,
      player2Tijeras,
      player2PiedraContraNada,
      player2PapelContraNada,
      player2TijerasContraNada,
    ].includes(true);
    if (player2Gana == true) {
      cs.winner = "player2";
      this.setState(cs);
    } else {
      if (cs.currentGame.playerMove != "") {
        cs.winner = "player1";
        this.setState(cs);
      }
    }
    if (cs.currentGame.playerMove == cs.currentGame.player2Move) {
      cs.winner = "";
      this.setState(cs);
    }
  },
  signUp(callback?) {
    const cs = this.getState();
    fetch(/* API_URL + */ "/signup", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userName: cs.signName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.userId = data.id;
        this.setState(cs);
        if (callback) {
          callback();
        }
      });
  },
  signIn(callback?) {
    const cs = this.getState();
    if (cs.userName) {
      fetch(/* API_URL + */ "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: cs.userName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        });
    }
  },
  signInPlayer2(callback) {
    const cs = this.getState();
    if (cs.player2Name) {
      fetch(/* API_URL + */ "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userName: cs.player2Name,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.player2Id = data.id;
          this.setState(cs);
          callback();
        });
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId || cs.player2Id) {
      fetch(/* API_URL + */ "/rooms", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: cs.userId,
          userName: cs.userName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("Error , id del usuario , inexistente");
    }
  },
  accessToRoom(callback?) {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("soy la data del accesToRoom", data);
        cs.rtdbRoomId = data.rtdbRoomId;
        this.listenPlayer2Values();
        this.setState(cs);
        if (callback) {
          callback();
        }
      });
  },
  accessToRoomPlayer2(callback?) {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.roomId + "?userId=" + cs.player2Id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenPlayer1Values();
        if (callback) {
          callback();
        }
      });
  },
  listenPlayer1Values() {
    const cs = this.getState();
    console.log("Im the rtdb room id in the listener :", cs.rtdbRoomId);
    const playerReference = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/player1");
    playerReference.on("value", (snapshot) => {
      const playerData = snapshot.val();
      console.log("soy player data player1:", playerData);
      const player = map(playerData);
      cs.currentGame.playerMove = player[0];
      cs.playAgainPlayer1 = player[1];
      cs.readyPlayer1 = player[2];
      cs.playerScore = player[3];
      cs.userId = player[4];
      cs.userName = player[5];
      cs.player1Winner = player[6];
      this.setState(cs);
    });
  },
  listenPlayer2Values() {
    const cs = this.getState();
    const playerRef = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/player2");
    playerRef.on("value", (snapshot) => {
      const playerData = snapshot.val();
      console.log("soy la playerData", playerData);
      const player = map(playerData);
      cs.currentGame.player2Move = player[0];
      cs.playAgainPlayer2 = player[1];
      cs.player2Id = player[2];
      cs.readyPlayer2 = player[3];
      cs.player2Score = player[4];
      cs.player2Name = player[5];
      cs.player2winner = player[6];
      this.setState(cs);
    });
  },
  setPlayer2NameAndId(callback?) {
    const cs = this.getState();
    console.log("LDLALASDLASDLASD : ", cs.rtdbRoomdId);

    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer2,
        userName: cs.player2Name,
        player2Id: cs.player2Id,
        ready: "",
        move: "",
        win: "",
        score: cs.player2Score || "",
      }),
    });
    if(callback){
      callback()
    }
  },
  setPlayer2MoveInDb() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer2,
        userName: cs.player2Name,
        player2Id: cs.player2Id,
        ready: "",
        move: cs.currentGame.player2Move,
        win: "",
        score: cs.player2Score,
      }),
    });
  },
  setPlayerMoveInDb() {
    const cs = this.getState();
    console.log("soy el roomId del setMove1", cs.rtdbRoomId);

    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player1", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer1,
        userName: cs.userName,
        userId: cs.userId,
        ready: "",
        move: cs.currentGame.playerMove,
        win: "",
        score: cs.playerScore,
      }),
    });
  },
  setReadyPlayer2(callback?) {
    const cs = this.getState();
    console.log(cs.rtdbRoomId);
    /* ACA ENTRA EN RECURSIÓN */
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer2,
        userName: cs.player2Name,
        player2Id: cs.player2Id,
        ready: "true",
        move: cs.currentGame.player2Move,
        win: "",
        score: cs.player2Score,
      }),
    });
    if (callback) {
      callback();
    }
  },
  setReadyPlayer(callback?) {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player1", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer1,
        move: cs.currentGame.playerMove,
        ready: "ready",
        score: cs.playerScore,
        userId: cs.userId,
        userName: cs.userName,
        win: "",
      }),
    });
    if (callback) {
      callback();
    }
  },
  setWinPlayer2() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer2,
        userName: cs.player2Name,
        player2Id: cs.player2Id,
        ready: "",
        move: cs.currentGame.player2Move,
        win: true,
        score: cs.player2Score,
      }),
    });
  },
  setWinPlayer() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player1", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer1,
        userName: cs.userName,
        userId: cs.userId,
        ready: "",
        move: cs.currentGame.playerMove,
        win: true,
        score: cs.playerScore,
      }),
    });
  },
  setPlayer2ScoreinDb() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer2,
        userName: cs.player2Name,
        player2Id: cs.player2Id,
        ready: "",
        move: "",
        win: "",
        score: cs.player2Score,
      }),
    });
  },
  setPlayerScoreinDb() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player1", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: cs.playAgainPlayer1,
        userName: cs.userName,
        userId: cs.userId,
        ready: "",
        move: cs.currentGame.playerMove,
        win: "",
        score: cs.playerScore,
      }),
    });
  },
  setPlayerPlayAgain() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player1", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: "true",
        userName: cs.userName,
        userId: cs.userId,
        ready: "",
        move: cs.currentGame.playerMove,
        win: "",
        score: cs.playerScore,
      }),
    });
  },
  setPlayer2PlayAgain() {
    const cs = this.getState();
    fetch(/* API_URL + */ "/rooms/" + cs.rtdbRoomId + "/player2", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        playAgain: "true",
        userName: "",
        player2Id: "",
        ready: "",
        move: "",
        win: "",
        score: "",
      }),
    });
  },
};
export { state };
