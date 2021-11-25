type Move = "tijeras" | "papel" | "piedra";
type Game = {
  playerMove: Move;
  computerMove: Move;
};
const API_URL = "http://localhost:3000";
const state = {
  data: {
    currentGame: {
      playerMove: "",
      computerMove: "",
    },
    userName: "",
    userId: "",
    roomId: "",
    rtdbId: "",
    winner: "",
    playerScore: 0,
    computerScore: 0,
  },
  listeners: [],
  scoreCounter(winner) {
    const newState = state.getState();
    if (winner === "player") {
      newState.playerScore++;
    } else {
      if (winner === "computer") {
        newState.computerScore++;
      }
    }
    state.setState(newState);
  },
  getState() {
    return this.data;
  },
  setState(newState) {
    localStorage.setItem("user-data", JSON.stringify(newState));
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("soy el state he cambiado", newState);
  },
  initStorage() {
    const localdata = localStorage.getItem("user-data");
    if (localdata == "null" || null) {
      return this.setState({
        currentGame: {
          playerMove: "",
          computerMove: "",
        },
        winner: "",
        playerScore: 0,
        computerScore: 0,
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
    state.setState(currentState);
  },
  result(playerMove, botMove) {
    const ganePiedra =
      state.data.currentGame.playerMove == "piedra" &&
      state.data.currentGame.computerMove == "tijeras";
    const ganePapel =
      state.data.currentGame.playerMove == "papel" &&
      state.data.currentGame.computerMove == "piedra";
    const ganeTijeras =
      state.data.currentGame.playerMove == "tijeras" &&
      state.data.currentGame.computerMove == "papel";
    const gano = [ganePiedra, ganePapel, ganeTijeras].includes(true);
    if (gano == true) {
      state.data.winner = "player";
    }
    const botPiedra =
      state.data.currentGame.computerMove == "piedra" &&
      state.data.currentGame.playerMove == "tijeras";
    const botPiedraContraNada =
      state.data.currentGame.computerMove == "piedra" &&
      state.data.currentGame.playerMove == "";
    const botPapel =
      state.data.currentGame.computerMove == "papel" &&
      state.data.currentGame.playerMove == "piedra";
    const botPapelContraNada =
      state.data.currentGame.computerMove == "papel" &&
      state.data.currentGame.playerMove == "";
    const botTijeras =
      state.data.currentGame.computerMove == "tijeras" &&
      state.data.currentGame.playerMove == "papel";
    const botTijerasContraNada =
      state.data.currentGame.computerMove == "tijeras" &&
      state.data.currentGame.playerMove == "";
    const botGana = [
      botPiedra,
      botPapel,
      botTijeras,
      botPiedraContraNada,
      botPapelContraNada,
      botTijerasContraNada,
    ].includes(true);
    if (botGana == true) {
      state.data.winner = "computer";
    }
    if (gano == false && botGana == false) {
      state.data.winner = "";
    }
  },
  setComputerMove(botMove) {
    const currentState = this.getState();
    currentState.currentGame.computerMove = botMove;
    state.setState(currentState);
  },
  signUp(callback?) {
    const cs = this.getState();
    fetch("/signup", {
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
        callback();
      });
  },
  signIn(callback?) {
    const cs = this.getState();
    if (cs.email) {
      fetch("/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: cs.userName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    }
  },
  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch("/rooms", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("soy lada data de askNewRoom", data);
          cs.roomId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("Error , id del usuario , inexistente");
    }
  },
  accessToRoom(callback?) {
    const cs = this.getState();
    fetch("/rooms/" + cs.roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("soy la data del accesToRoom", data);
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenRoom();
      });
  },
};
export { state };
