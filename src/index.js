import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
import watcherSaga from "./redux/sagas/_root.saga";
// Import saga middleware
import rootReducer from "./redux/reducers/_root.reducer";
import createSagaMiddleware from "redux-saga";

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);
// Add sagaMiddleware to our store ^

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(watcherSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
