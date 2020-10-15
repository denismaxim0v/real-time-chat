import * as constants from "./exampleConstants";

const initialState = {
  data: "Init Data",
};

export const changeExampleData = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.SET_SOME_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export const changeExampleDataPersisted = (
  state = initialState,
  action = {}
) => {
  switch (action.type) {
    case constants.SET_SOME_DATA:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};