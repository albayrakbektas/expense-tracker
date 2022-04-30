import {Category} from "./category";
import {ThunkDispatch} from "redux-thunk";

export interface RecordState {
    data: Record[],
    loading: boolean,
    error: string
}

export interface Record {
    id: number;
    title: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface RecordForm {
    title: string,
    amount: number,
    category_id: number
}

interface GET_START {
    type: "GET_RECORD_START"
}
interface GET_SUCCESS {
    type: "GET_RECORD_SUCCESS"
    payload: Record[]
}
interface GET_ERROR {
    type: "GET_RECORD_ERROR"
}

interface ADD_START {
    type: "ADD_RECORD_START"
}
interface ADD_SUCCESS {
    type: "ADD_RECORD_SUCCESS"
    payload: Record
}
interface ADD_ERROR {
    type: "ADD_RECORD_ERROR"
}

// interface DELETE_START {
//     type: "DELETE_RECORD_START"
// }
// interface DELETE_SUCCESS {
//     type: "DELETE_RECORD_SUCCESS"
//     payload: Record[]
// }
// interface DELETE_ERROR {
//     type: "DELETE_RECORD_ERROR"
// }

export type RecordAction = GET_START | GET_SUCCESS | GET_ERROR | ADD_START | ADD_SUCCESS | ADD_ERROR
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>