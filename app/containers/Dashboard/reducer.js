/*
 *
 * Dashboard reducer
 *
 */

export const GET_DISCIPLINES = 'GET_DISCIPLINES';
export const GET_DISCIPLINES_SUCCESS = 'GET_DISCIPLINES_SUCCESS';
export const GET_DISCIPLINES_ERROR = 'GET_DISCIPLINES_ERROR';
export const SUBMIT_USER_QUERY = 'SUBMIT_USER_QUERY';
export const SUBMIT_USER_QUERY_SUCCESS = 'SUBMIT_USER_QUERY_SUCCESS';
export const SUBMIT_USER_QUERY_ERROR = 'SUBMIT_USER_QUERY_ERROR';

export const GET_USER_OPEN_QUERIES = 'GET_USER_OPEN_QUERIES';
export const GET_USER_OPEN_QUERIES_SUCCESS = 'GET_USER_OPEN_QUERIES_SUCCESS';
export const GET_USER_OPEN_QUERIES_ERROR = 'GET_USER_OPEN_QUERIES_ERROR';

export const SEND_USER_MESSAGE = 'SEND_USER_MESSAGE';
export const SEND_USER_MESSAGE_SUCCESS = 'SEND_USER_MESSAGE_SUCCESS';
export const SEND_USER_MESSAGE_ERROR = 'SEND_USER_MESSAGE_ERROR';

export const GET_UNACCEPTED_QUERIES = 'GET_UNACCEPTED_QUERIES';
export const GET_UNACCEPTED_QUERIES_SUCCESS = 'GET_UNACCEPTED_QUERIES_SUCCESS';
export const GET_UNACCEPTED_QUERIES_ERROR = 'GET_UNACCEPTED_QUERIES_ERROR';

export const GET_HISTORY_QUERIES = 'GET_HISTORY_QUERIES';
export const GET_HISTORY_QUERIES_SUCCESS = 'GET_HISTORY_QUERIES_SUCCESS';
export const GET_HISTORY_QUERIES_ERROR = 'GET_HISTORY_QUERIES_ERROR';
// export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

const getDisciplinesSuccess = (state, payload) => ({
  ...state,
  loading: false,
  disciplinesList: payload,
});

const submitUserQuerySuccess = (state, payload) => ({
  ...state,
  loading: false,
  chatId: payload,
  submitUserQuerySuccess: true,
});

const getUserOpenQueriesSuccess = (state, payload) => ({
  ...state,
  loading: false,
  userOpenQueries: payload,
});

const sendUserMessageSuccess = (state, payload) => ({
  ...state,
  loading: false,
  sentMessageId: payload,
});

const getUnacceptedQueriesSuccess = (state, payload) => ({
  ...state,
  loading: false,
  unacceptedQueriesList: payload,
});

const getHistoryQueriesSuccess = (state, payload) => ({
  ...state,
  loading: false,
  historyQueriesList: payload,
});
// any extra manipulation to the payload can be done here

// Add to global state

export const dashboardReducer = (state, action) => {
  switch (action.type) {
    case GET_DISCIPLINES:
      return {
        ...state,
        laoding: true,
      };
    case GET_DISCIPLINES_SUCCESS:
      return getDisciplinesSuccess(state, action.payload);
    case GET_DISCIPLINES_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'get discipline api issue',
      };
    case SUBMIT_USER_QUERY:
      return {
        ...state,
        laoding: true,
        submitUserQuerySuccess: false,
      };
    case SUBMIT_USER_QUERY_SUCCESS:
      return submitUserQuerySuccess(state, action.payload);
    case SUBMIT_USER_QUERY_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'submit query api issue',
      };

    case GET_USER_OPEN_QUERIES:
      return {
        ...state,
        laoding: true,
      };
    case GET_USER_OPEN_QUERIES_SUCCESS:
      return getUserOpenQueriesSuccess(state, action.payload);
    case GET_USER_OPEN_QUERIES_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'get queries api issue',
      };

    case SEND_USER_MESSAGE:
      return {
        ...state,
        laoding: true,
      };
    case SEND_USER_MESSAGE_SUCCESS:
      return sendUserMessageSuccess(state, action.payload);
    case SEND_USER_MESSAGE_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'get queries api issue',
      };

    case GET_UNACCEPTED_QUERIES:
      return {
        ...state,
        laoding: true,
      };
    case GET_UNACCEPTED_QUERIES_SUCCESS:
      return getUnacceptedQueriesSuccess(state, action.payload);
    case GET_UNACCEPTED_QUERIES_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'get queries api issue',
      };
    case GET_HISTORY_QUERIES:
      return {
        ...state,
        laoding: true,
      };
    case GET_HISTORY_QUERIES_SUCCESS:
      return getHistoryQueriesSuccess(state, action.payload);
    case GET_HISTORY_QUERIES_ERROR:
      return {
        ...state,
        laoding: true,
        error: 'get queries api issue',
      };
    default:
      return state;
  }
};
