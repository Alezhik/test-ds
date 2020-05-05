import {
  LOGIN_REQUEST,
  LOGIN_SECCUES,
  LOGIN_FAILURE,
  LOGOUT,
  RESET_TOKEN_REQUEST,
  RESET_TOKEN_SECCUES,
  RESET_TOKEN_FAILURE,
  TOKEN_NOT_RELEVANT,
} from './constants';

export function loginRequest(data) {
  return {
    data,
    type: LOGIN_REQUEST,
  };
}

export function loginSeccues(data) {
  return {
    data,
    type: LOGIN_SECCUES,
  };
}

export function loginFailure(error) {
  return {
    error,
    type: LOGIN_FAILURE,
  };
}

export function refreshRequest(data) {
  return {
    data,
    type: RESET_TOKEN_REQUEST,
  };
}

export function refreshSeccues(data) {
  return {
    data,
    type: RESET_TOKEN_SECCUES,
  };
}

export function refreshFailure(error) {
  return {
    error,
    type: RESET_TOKEN_FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function tokenNotRelevant() {
  return {
    type: TOKEN_NOT_RELEVANT,
  };
}
