import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectsUsersDomain = state => state.users || initialState;

export const getUsers = () =>
  createSelector(
    selectsUsersDomain,
    state => state.users,
  );
