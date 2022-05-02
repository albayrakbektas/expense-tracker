import { RecordAction, RecordState } from "../../types/record";

const defaultState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

const recordReducer = (
  state: RecordState = defaultState,
  action: RecordAction
): RecordState => {
  switch (action.type) {
    case "GET_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORD_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "GET_RECORD_ERROR":
      return { ...state, loading: false, error: "Error Fetching Records" };
    case "ADD_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_RECORD_ERROR":
      return { ...state, loading: false, error: "Error Adding Record" };
    case "UPDATE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((record) =>
          record.id === action.payload.id ? action.payload : record
        ),
      };
    case "UPDATE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error Updating Record" };
    case "DELETE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.filter((record) => record.id !== action.payload),
      };
    case "DELETE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error Deleting Record" };
    default:
      return state;
  }
};

export default recordReducer;
