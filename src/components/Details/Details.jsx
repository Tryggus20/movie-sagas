import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
export default function Details() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); // Extract the 'id' from the URL

  const store = useSelector((store) => store);
  const selectedMovie = store.selectedMovie[0];
  console.log("what is in store?", store);
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRE", payload: id }); //not working yet
    dispatch({ type: "FETCH_MOVIE", payload: id });
  }, [dispatch, id]);
  function goBack() {
    history.push("/");
  }

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <hr />
      <br />
      {selectedMovie &&
      <>
      <p>Title: {selectedMovie.title} </p>
      <img src={selectedMovie.poster} />
      <p>{selectedMovie.description}</p>
      <ul>
{store.selectedGenre.map((genre, index) => (
    <li key={index}>{genre.name}</li>
))}      </ul>
</>
}
      {/* title poster description name (name is the list of genres) */}
    </div>
  );
}
