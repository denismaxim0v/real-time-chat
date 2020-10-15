
import * as constants from "./exampleConstants";

export const setExampleValue = (string) => ({
  type: constants.SET_SOME_DATA,
  payload: string
});