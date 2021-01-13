import App from "../client/App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import express from "express";
import { renderToString } from "react-dom/server";

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .post("/room", async (req, res) => {
    console.log("Making a new room...");
    try {
      // let randomNonogram = await loadNonogram();
      // const { width, height, rows, columns, ans, ans_count } = randomNonogram;
      // console.log(ans_count);
      // const newRoom = await pool.query(
      //   "INSERT INTO rooms (i_width, i_height, a_rows, a_columns, a_ans, history, i_correct, i_correct_ans) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      //   [width, height, rows, columns, ans.split(""), "[]", 0, ans_count]
      // );
      // let roomId = newRoom.rows[0].id;
      // if (newRoom.rowCount) {
      //   res.json({ message: "Room was created succesfully", room: roomId });
      // }
    } catch (err) {
      console.error(err);
    }
  })
  .get("/*", (req, res) => {
    const context = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
        ${
          process.env.NODE_ENV === "production"
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
      );
    }
  });

export default server;
