import {takeEvery, put} from "redux-saga/effects"
import axios from "axios"

// Create the rootSaga generator function
function* watcherSaga() {
    yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  }
  
  function* fetchAllMovies() {
    // get all movies from the DB
    try {
      const movies = yield axios.get("/api/movie");
      console.log("get all:", movies.data);
      yield put({ type: "SET_MOVIES", payload: movies.data });
    } catch {
      console.log("get all error");
    }
  }
  
export default watcherSaga