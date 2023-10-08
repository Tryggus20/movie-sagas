import { combineReducers } from "redux";

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return action.payload;
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case "SET_GENRES":
      return action.payload;
    default:
      return state;
  }
};

const selectedGenre = (state = "", action) => {
  //stores selected genres
  switch (action.type) {
    case "SELECT_GENRE":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  movies,
  genres,
  selectedGenre,
});

export default rootReducer;
