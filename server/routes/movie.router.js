const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
});

router.post("/genre", (req, res) => {
  console.log("in post for new movie", req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log("in first query req.body", req.body);
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;
      const genreArray = req.body.genreIds;
      let sqlArrayValues = "";
      //looping through array of genres so multiple genres can be added to the database for a single movie
      for (i = 2; i <= genreArray.length + 1; i++) {
        sqlArrayValues += `($1, $${i}),`;
      }
      sqlArrayValues = sqlArrayValues.slice(0, -1);
      // Now handle the genre reference
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ${sqlArrayValues};
      `;
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, ...genreArray])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log("----------", err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log("log for first query", err);
      res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
  // Add query to get all info for a specific movie
  console.log("_______________", req.params.id);
  const queryText = `SELECT * FROM movies WHERE movies.id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log(`error on GET query for a specific MOVIE `, err);
      res.sendStatus(500);
    });
});

module.exports = router;
