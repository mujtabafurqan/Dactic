import { call, put, takeLatest } from 'redux-saga/effects';
// import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { GOOGLE_LOGIN } from './constants';
// import { repoLoadingError } from 'containers/App/actions';

// import { reposLoaded, repoLoadingError } from 'containers/App/actions';

// import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 *
 */
export function* loginPageSaga() {
  console.log(`saga called`);

  const requestURL = `/v1/auth/login`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    console.log(`google response ${repos}`);
    // yield put(reposLoaded(repos, username));
  } catch (err) {
    console.log(err);
  }
}

export default function* userLogin() {
  yield takeLatest(GOOGLE_LOGIN, loginPageSaga);
}
