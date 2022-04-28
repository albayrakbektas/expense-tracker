import {combineReducers} from "redux";
import {UserState} from "../types/user";
import UserReducer from "./reducers/userReducer";

export interface AppState {
    user: UserState,
    // categories: any,
    // records: any
}

const rootReducer = combineReducers<AppState>({
    user: UserReducer,
    // categories: () => {},
    // records: () => {}
})

export default rootReducer;