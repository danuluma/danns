import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleWares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWares))
);

export default store;
