import { combineReducers } from "redux";

import tabReducer from "./tab/tabReducer";
import marketReducer from "./market/MarketReducer";

export default combineReducers({
  tabReducer,
  marketReducer,
});
