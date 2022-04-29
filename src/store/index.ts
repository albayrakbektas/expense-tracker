import {combineReducers} from "redux";
import {UserState} from "../types/user";
import UserReducer from "./reducers/userReducer";
import {CategoryState} from "../types/category";
import CategoryReducer from "./reducers/categoryReducer";

export interface AppState {
    user: UserState,
    categories: CategoryState,
    // records: any
}

const rootReducer = combineReducers<AppState>({
    user: UserReducer,
    categories: CategoryReducer,
    // records: () => {}
})

export default rootReducer;