import {takeEvery, put} from "redux-saga/effects"
import axios from "axios"

// Create the rootSaga generator function
function* watcherSaga() {
    yield takeEvery("FETCH_MOVIES", fetchAllMovies);
    yield takeEvery("FETCH_GENRE", fetchGenre)
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

function* fetchGenre(action) { 
    console.log("aaaaand action!",action);
    try {
        console.log("in the fetch genre saga:", action.payload)
        const response = yield axios.get(`/api/genre/${action.payload}`)
        console.log("fetch genre response: ", response);
        yield put({ type: 'SELECT_GENRE', payload: response.data })

    } catch {
        console.error(`error fetching genres`);
    }
}



  
export default watcherSaga