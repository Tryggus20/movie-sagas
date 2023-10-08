import { useHistory } from "react-router-dom";

export default function MovieForm() {
  const history = useHistory();
  function getNewMovie() {
    let title = document.getElementById("title").value;
    let picture = document.getElementById("picture").value;
    let description = document.getElementById("description").value;

    let selectedGenres = document.querySelectorAll(
      'input[name="genre"]:checked'
    );
    let selectedValues = Array.from(selectedGenres).map((genre) => genre.value);

    alert(
      "Title: " +
        title +
        "\nPicture URL: " +
        picture +
        "\nDescription: " +
        description +
        "\nSelected Genres: " +
        selectedValues.join(", ")
    );
  }
  return (
    <div>
      <button onClick={() => history.push("/")}>Go Back</button>
      <p>New Movie:</p>
      <div className="input-fields">
        <label>
        <input type="text" id="title" placeholder="Title" />
        </label>
        <br />
        <label>
        <input type="text" id="picture" placeholder="URL" />
        </label>
        <br />
        <label>
        <textarea id="description" rows="2" placeholder="Description"></textarea>        </label>
        <br />
        {/* START OF TABLE HERE */}
        <p>Genres:</p>
        <table className="input-table">
          <tbody>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="adventure"
                  name="genre"
                  value="adventure"
                />
                Adventure
              </td>
              <td>
                <input
                  type="checkbox"
                  id="animated"
                  name="genre"
                  value="animated"
                />
                Animated
              </td>
              <td>
                <input
                  type="checkbox"
                  id="biographical"
                  name="genre"
                  value="biographical"
                />
                Biographical
              </td>
              <td>
                <input
                  type="checkbox"
                  id="comedy"
                  name="genre"
                  value="comedy"
                />
                Comedy
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="disaster"
                  name="genre"
                  value="disaster"
                />
                Disaster
              </td>
              <td>
                <input type="checkbox" id="drama" name="genre" value="drama" />
                Drama
              </td>
              <td>
                <input type="checkbox" id="epic" name="genre" value="epic" />
                Epic
              </td>
              <td>
                <input
                  type="checkbox"
                  id="fantasy"
                  name="genre"
                  value="fantasy"
                />
                Fantasy
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="musical"
                  name="genre"
                  value="musical"
                />
                Musical
              </td>
              <td>
                <input
                  type="checkbox"
                  id="romantic"
                  name="genre"
                  value="romantic"
                />
                Romantic
              </td>
              <td>
                <input
                  type="checkbox"
                  id="scienceFiction"
                  name="genre"
                  value="scienceFiction"
                />
                Science Fiction
              </td>
              <td>
                <input
                  type="checkbox"
                  id="spaceOpera"
                  name="genre"
                  value="spaceOpera"
                />
                Space Opera
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="checkbox"
                  id="superhero"
                  name="genre"
                  value="superhero"
                />
                Superhero
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>
      <button onClick={getNewMovie}>Submit</button>
    </div>
  );
}
