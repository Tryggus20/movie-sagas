import {takeEvery, put, call} from "redux-saga/effects"
import axios from "axios"

// Create the rootSaga generator function
function* watcherSaga() {
    yield takeEvery("FETCH_MOVIES", fetchAllMovies);
    yield takeEvery("FETCH_GENRE", fetchGenre);
    yield takeEvery("FETCH_MOVIE", fetchMovie);
    yield takeEvery("FETCH_GENRES", fetchGenresSaga);
    yield takeEvery("ADD_MOVIE", addMovieSaga)
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

// fetches specific movie for details view
function* fetchGenre(action) { 
    // console.log("aaaaand action!",action);
    try {
        console.log("in the fetch genre saga:", action.payload)
        // had to change this to a .get to work
        const response = yield axios.get(`/api/genre/${action.payload}`)
        console.log("fetch genre response: ", response);
        yield put({ type: 'SELECT_GENRE', payload: response.data })

    } catch (err) {
        console.error(`error fetching genres for a specific movie`, err);
    }
}

// fetches specific movie for details view
function* fetchMovie(action) { 
    // console.log("aaaaand action!",action);
    try {
        console.log("in the fetch single movie saga:", action.payload)
        const response = yield axios.get(`/api/movie/${action.payload}`)
        console.log("fetch single movie response: ", response);
        yield put({ type: 'SELECT_MOVIE', payload: response.data })

    } catch (err) {
        console.error(`error fetching a specific movie`,err);
    }
}

// fetch all genres to for MovieForm component
function* fetchGenresSaga() {
    try {
        const response = yield call(axios.get, '/api/genres');
        yield put({ type: 'SET_GENRES', payload: response.data });
    } catch (error) {
        console.log('Error fetching genres:', error);
    }
}

// saga to add movie to the database
// function* addMovieSaga(action) {
//     try {
//         console.log("what is in my action payload for adding a movie?", action.payload);

//         // First, post the movie information and retrieve the new movie's ID
//         const response = yield call(axios.post, '/api/movie/genre', {
//             title: action.payload.title,
//             poster: action.payload.poster,
//             description: action.payload.description,
//         });
//         const movieId = response.data.id;
// /// *********** somewhere in here is the issue *******////
//         // Convert string genre IDs to integers
//         console.log("in root saga genreIds",genreIds);
//         const integerGenreIds = action.payload.genreIds.map(id => parseInt(id, 10));
//         console.log("Original genreIds:", action.payload.genreIds);
//         console.log("Parsed integerGenreIds:", integerGenreIds);
//         // Iterate over the genre IDs and associate each one with the new movie
//         for (let genreId of integerGenreIds) {
//             console.log("in root.saga loop movie id genr id",movieId, genreId);
//             yield call(axios.post, '/api/movie/genre', { movie_id: movieId, genre_id: genreId });
//         }
//     } catch (error) {
//         console.log('Error adding movie:', action.payload, error);
//     }
// }
function* addMovieSaga(action) {
    const newMovie = action.payload;
    try {
      yield axios.post('/api/movie/genre', newMovie);
      yield put({ type: 'FETCH_MOVIES' });
    } catch (err) {
      console.log('error in postNewMovie', err);
    }
  }
  


  
export default watcherSaga