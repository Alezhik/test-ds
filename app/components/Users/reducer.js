import produce from 'immer';
import { USERS_REQUEST, USERS_SECCUES, USERS_FAILURE } from './constants';

export const initialState = {
  error: null,
  loading: false,
  users: [],
};

/* eslint-disable default-case, no-param-reassign */
const usersReduser = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USERS_REQUEST:
        draft.loading = true;
        break;

      case USERS_SECCUES:
        draft.loading = false;
        draft.users = action.data;
        break;

      case USERS_FAILURE:
        draft.loading = true;
        draft.error = action.error;
        break;

      default:
        break;
    }
  });

export default usersReduser;
