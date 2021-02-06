import { fromJS } from "immutable";
import { applyMiddleware, createStore } from "redux";
import reduxSaga from "redux-saga";
import { JWT_TOKEN } from "../constants";
import { getStorage } from "../services/frontend";
import rootReducer, { initialState } from "./reducer";
import saga from "./saga";

const loadState = () => {
  try {
    const serializedState = JSON.parse(localStorage.getItem("state") ?? "{}");
    const jwtToken = JWT_TOKEN;
    serializedState.token = getStorage(jwtToken);
    return fromJS({ ...initialState.toJS(), ...serializedState });
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch {}
};

const persistedState = loadState();
// create the saga middleware
const sagaMiddleware = reduxSaga();

const store = createStore(rootReducer, persistedState, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(saga);

store.subscribe(() => {
  let state = store.getState();
  saveState({
    // mode: state.get("mode"),
  });
});

export default store;
