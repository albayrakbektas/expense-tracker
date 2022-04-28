import {LoginForm, UserDispatch} from "../../types/user";
import api from "../../utils/api";

export const login = (creds: LoginForm) => async (dispatch: UserDispatch) => {
    dispatch({type: "LOGIN_START"})
    try {
        const response = await api.post('/users/login', creds)
        dispatch({type: "LOGIN_SUCCESS", payload: response.data})
    } catch {
        dispatch({type: "LOGIN_ERROR"})
    }
}