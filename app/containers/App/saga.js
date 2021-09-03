// import { call, put, takeLatest } from 'redux-saga/effects';
// // import { call, put, select, takeLatest } from 'redux-saga/effects';

// import { PROFILE_REQUESTED } from 'containers/App/constants';
// import { repoLoadingError } from 'containers/App/actions';

// // import { reposLoaded, repoLoadingError } from 'containers/App/actions';

// import request from 'utils/request';
// // import { makeSelectUsername } from 'containers/HomePage/selectors';

// export function* getProfile(payload) {
//   console.log(payload, 'payload');

//   const requestURL = `/v1/auth/user/profile`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const user = yield call(request, requestURL);
//     console.log(`profile response ${user}`);
//     // yield put(reposLoaded(repos, username));
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default function* watchGetProfile() {
//   yield takeLatest(PROFILE_REQUESTED, getProfile);
// }
