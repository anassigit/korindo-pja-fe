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

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const reloginUser = (user, history) => {
  return {
    type: RELOGIN_USER,
    payload: { user, history },
  }
}

export const reloginSuccess = user => {
  return {
    type: RELOGIN_SUCCESS,
    payload: user,
  }
}

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE,
  };
}
