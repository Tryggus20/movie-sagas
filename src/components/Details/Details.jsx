import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom"; 
export default function Details() {
  const dispatch = useDispatch();
  const history = useHistory(); 
  const { id } = useParams(); // Extract the 'id' from the URL

  const store = useSelector((store) => store);
console.log("what is in store?", store);
  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRE", payload: id }); //not working yet
    dispatch({ type: "FETCH_MOVIE", payload: id})
  }, [dispatch, id]);
  function goBack() {
    history.push("/");
  }

  return (
    <div>
      <button onClick={goBack}>Go Back</button>
      <hr /><br />
      <p>Title: </p>
      <img src="images/finding-nemo.jpg" />
      <p>Description</p>
      <li>Genres</li>
      {/* title poster description name (name is the list of genres) */}
    </div>
  );
}
