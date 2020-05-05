import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, RESET_TOKEN_REQUEST } from './constants';
import {
  loginSeccues,
  loginFailure,
  refreshSeccues,
  refreshFailure,
} from './actions';
import { loginWithPassword, refreshToken } from '../../services/API';
import { setToken } from '../../services/_helpers';

function* loginSaga(action) {
  try {
    const loginRequest = yield loginWithPassword(action.data);
    setToken(
      'access_token',
      `${loginRequest.data.token_type} ${loginRequest.data.access_token}`,
    );
    setToken('refresh_token', `${loginRequest.data.refresh_token}`);
    yield put(loginSeccues());
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* refreshSaga() {
  try {
    const refreshRequest = yield refreshToken();
    yield setToken(
      'access_token',
      `${refreshRequest.data.token_type} ${refreshRequest.data.access_token}`,
    );
    yield setToken('refresh_token', `${refreshRequest.data.refresh_token}`);

    yield put(refreshSeccues());
  } catch (error) {
    yield put(refreshFailure(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(RESET_TOKEN_REQUEST, refreshSaga);
}
