import { USERS_REQUEST, USERS_SECCUES, USERS_FAILURE } from './constants';

export function usersRequest(data) {
  return {
    data,
    type: USERS_REQUEST,
  };
}

export function usersSeccues(data) {
  return {
    data,
    type: USERS_SECCUES,
  };
}

export function usersFailure(error) {
  return {
    error,
    type: USERS_FAILURE,
  };
}
