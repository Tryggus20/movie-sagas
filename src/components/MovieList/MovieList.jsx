import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import { useHistory } from "react-router-dom";

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h2>Movie Collection:</h2>
      <br />
      <button onClick={() => history.push("/movieForm")}>
        Add A New Movie
      </button>
      <br /> <br />
      <hr/>
      <section className="movies">
        {movies.map((movie) => {
// maps over the movies and displays each one in a <div>
          return (
            <div
              className="movie-card"
              key={movie.id}
              onClick={() => history.push(`/details/${movie.id}`)}
            >
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
