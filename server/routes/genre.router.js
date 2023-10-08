const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  // Add query to get all genres
  const queryText = `SELECT * from "genres" ORDER BY "name" ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error on GET querry for GENRES `, err);
      res.sendStatus(500);
    });
});

module.exports = router;
