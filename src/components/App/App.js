import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../MovieList/MovieList";
import Details from "../Details/Details";
import MovieForm from "../MovieForm/MovieForm";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route path="/movieForm">
          <MovieForm />
        </Route>
      </Router>
    </div>
  );
}

export default App;
