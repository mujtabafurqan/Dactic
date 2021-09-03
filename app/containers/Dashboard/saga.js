// import { call, put, takeLatest } from 'redux-saga/effects';
// // import { call, put, select, takeLatest } from 'redux-saga/effects';

// import request from 'utils/request';
// import { GET_DISCIPLINE } from './constants';
// // import { repoLoadingError } from 'containers/App/actions';
// // import { makeSelectUsername } from 'containers/HomePage/selectors';

// export function* dashboardSaga(payload) {
//   console.log(payload, 'payload');

//   const requestURL = `/v1/getDisciplines`;

//   try {
//     // Call our request helper (see 'utils/request')
//     const disciplinesList = yield call(request, requestURL);
//     console.log(`disciplinesList ${disciplinesList}`);
//     // yield put(reposLoaded(repos, username));
//   } catch (err) {
//     console.log(err);
//   }
// }

// export default function* watchGetProfile() {
//   yield takeLatest(GET_DISCIPLINE, dashboardSaga);
// }
