import produce from 'immer';
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
import { getToken } from '../../services/_helpers';
import { authTokenDelay } from '../../constants/delays';

const token = getToken('access_token', authTokenDelay);

export const initialState = {
  error: null,
  loading: false,
  isAuthorized: !!token,
};

/* eslint-disable default-case, no-param-reassign */
const loginReduser = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
        break;

      case LOGIN_SECCUES:
        draft.isAuthorized = true;
        break;

      case LOGIN_FAILURE:
        draft.error = action.error;
        break;

      case RESET_TOKEN_REQUEST:
        draft.loading = true;
        draft.isAuthorized = false;
        break;

      case RESET_TOKEN_SECCUES:
        draft.loading = false;
        draft.isAuthorized = true;
        draft.refresh = true;
        break;

      case RESET_TOKEN_FAILURE:
        draft.isAuthorized = false;
        draft.loading = false;
        draft.error = action.error;
        break;

      case LOGOUT:
        draft.error = null;
        draft.loading = false;
        draft.isAuthorized = false;
        break;

      case TOKEN_NOT_RELEVANT:
        draft.isAuthorized = false;
        break;

      default:
        break;
    }
  });

export default loginReduser;
