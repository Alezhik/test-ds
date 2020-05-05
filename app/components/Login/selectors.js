import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectsLoginDomain = state => state.login || initialState;

export const getIsAuth = () =>
  createSelector(
    selectsLoginDomain,
    state => state.isAuthorized,
  );
export const getIsRefresh = () =>
  createSelector(
    selectsLoginDomain,
    state => state.refresh,
  );
export const getLoading = () =>
  createSelector(
    selectsLoginDomain,
    state => state.loading,
  );
