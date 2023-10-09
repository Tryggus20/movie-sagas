import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

export default function MovieForm() {
  const history = useHistory();
  // getting form info to create a new object
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  // getting array of genres for the new movie
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  console.log("selected genres", selectedGenres);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !poster || !description || selectedGenres.length === 0) {
      alert('Please fill in all fields, including selecting at least one genre.');
      return; // Do not proceed with submission if any field is empty
    }
    const movieData = {
      title,
      poster,
      description,
      genreIds: selectedGenres,
    };
    dispatch({ type: "ADD_MOVIE", payload: movieData });
    //clear inputs after submit
    setTitle("");
    setPoster("");
    setDescription("");
    setSelectedGenres([]); 
    //go back to home page after movie has been added
  history.push("/") };

  
  // the form with all of the inputs for a new movie
  return (
    <div>
      <button onClick={() => history.push("/")}>Go Back</button>
      <br /> <br />
      <hr/>
      <p>New Movie:</p>
      <br />
      <div className="input-fields">
        <label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            id="poster"
            placeholder="URL"
            onChange={(e) => setPoster(e.target.value)}
          />
        </label>
        <br />
        <label>
          <textarea
            id="description"
            rows="2"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>{" "}
        </label>
        <br />
        {/* START OF TABLE HERE */}
        <p>Genres:</p>
        <table className="input-table">
          <tbody>
            <tr>
              {genres.map((genre) => (
                <td key={genre.id}>
                  <input
                    type="checkbox"
                    id={genre.name}
                    name="genre"
                    value={genre.id}
                    onChange={handleCheckboxChange}
                  />
                  {genre.name}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        <hr/>
      </div>
    </div>
  );
}
