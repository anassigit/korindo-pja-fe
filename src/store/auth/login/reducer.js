import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RELOGIN_USER,
  RELOGIN_SUCCESS,
  RESET_MESSAGE,
} from "./actionTypes"

const initialState = {
  error: "",
  loading: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
      }
      break
    case LOGOUT_USER:
      state = { ...state }
      break
    case LOGOUT_USER_SUCCESS:
      state = { ...state }
      break
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false }
      break
    default:
      state = { ...state }
      break
    case RELOGIN_USER:
      state = {
        ...state,
        loading: true,
      }
      break
    case RESET_MESSAGE:
      return {
        ...state,
        error: "", 
      }
  }
  return state
}

export default login
