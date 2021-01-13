import express from "express";

let app = require("./server").default;

if (module.hot) {
  module.hot.accept("./server", function () {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT || 3000;

const server = express()
  .use((req, res) => app.handle(req, res))
  .listen(port, function (err) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> Started on port ${port}`);
  });

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  const roomID = socket.handshake.query.id;

  pool
    .query(`SELECT i_correct, i_correct_ans FROM rooms WHERE id=$1`, [roomID])
    .then((result) => {
      let { i_correct_ans, i_correct } = result.rows[0];
      if (i_correct === i_correct_ans) io.emit("finished puzzle", true);
    });

  socket.on("chat message", (msg) => {
    console.log("Got message! Emitting to everyone..:" + msg);
    io.emit("new message", msg);
  });

  pool.query("SELECT a_ans FROM rooms WHERE id=$1", [roomID]).then((result) => {
    let ans = result.rows[0].a_ans;
    socket.on("cell click", (cellID) => {
      let correctClick = ans[cellID] == 1;
      console.log("Cell clicked! Emitting to everyone in room:" + roomID);
      let json = JSON.stringify({ cell: cellID, correct: correctClick });
      let int = correctClick ? 1 : 0;
      pool
        .query(
          `UPDATE rooms 
          SET history = 
          history || $1::jsonb, i_correct = i_correct + $2
          WHERE id=$3 returning i_correct_ans, i_correct;`,
          [json, int, roomID]
        )
        .then((result) => {
          let { i_correct_ans, i_correct } = result.rows[0];
          if (i_correct === i_correct_ans) io.emit("finished puzzle", true);
        });

      io.emit("new cell click", { cellID, correctClick });
    });
  });
});
