const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// get request for the MovieForm
router.get("/", (req, res) => {
  console.log("in /genres");
  const query = `SELECT * FROM genres`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all genres", err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  console.log("in GET FOR SPECIFIC MOVIE wrong one");
  // Add query to get all genres for a specific movie
  const queryText = `SELECT genres.name FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error on GET query for GENRES `, err);
      res.sendStatus(500);
    });
});

module.exports = router;
