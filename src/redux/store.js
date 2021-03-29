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
    const firstLoad = JSON.parse(sessionStorage.getItem("firstLoad")) ?? true;
    const acceptCookie = JSON.parse(sessionStorage.getItem("acceptCookie")) ?? false;
    serializedState.token = getStorage(jwtToken);
    return fromJS({ ...initialState.toJS(), ...serializedState, firstLoad, acceptCookie });
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
  if (process.browser) {
    let state = store.getState();
    const firstLoad = state.get("firstLoad");
    const acceptCookie = state.get("acceptCookie");
    sessionStorage?.setItem("firstLoad", firstLoad);
    sessionStorage?.setItem("acceptCookie", acceptCookie);
    saveState({
      // mode: state.get("mode"),
      tokenUser: state.get("tokenUser"),
      userInfo: state.get("userInfo"),
    });
  }
});

export default store;
