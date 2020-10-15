import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  changeExampleData,
  changeExampleDataPersisted,
} from "../components/redux-exmpl/store/exampleReducers";

const persistConfig = {
  key: "someData",
  whitelist: [
    "changeExampleDataPersisted",
  ],
  storage,
};

const rootReducer = combineReducers({
  changeExampleDataPersisted,
  changeExampleData,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };