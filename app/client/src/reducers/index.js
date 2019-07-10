import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

// Combine our authReducer and errorReducer into one
export default combineReducers({
    auth: authReducer,
    errors: errorReducer
});