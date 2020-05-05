import { put, takeLatest } from 'redux-saga/effects';
import { USERS_REQUEST } from './constants';
import { usersSeccues, usersFailure } from './actions';
import { getUsers } from '../../services/API';

function* usersSaga() {
  try {
    const userRequest = yield getUsers();

    yield put(usersSeccues(userRequest.data));
  } catch (error) {
    yield put(usersFailure(error));
  }
}

export default function* rootSaga() {
  yield takeLatest(USERS_REQUEST, usersSaga);
}
