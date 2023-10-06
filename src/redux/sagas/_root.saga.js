// import reduxSaga from "redux-saga";
// import {takeEvery, put} from "reduxSaga/effects"
// import axios from "axios"

// function* watcherSaga() {
//     yield takeEvery('FETCH_MOVIES', searchMovieSaga)
// }


// function* searchMovieSaga(action) {
//     try {
//         const response = yield axios.get(`/api/movie/${action.payload}`)
//         yield put({ type:'SET_MOVIES', payload: response.data })
//         console.log('response', response.data);
//     } catch (error) {
//         console.log('there was an err in searchMovieSaga', error);
//     }
// }

// export default watcherSaga