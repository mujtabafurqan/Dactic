/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

const getUserSuccess = (state, action) => {
  const user = action;
  // make manipulations to your payload after getting it from api call
  // Add to global state
  return { ...state, user, loading: false };
};

const onLoginSuccess = (state, payload) => {
  const loggedInFlag = payload;
  return { ...state, loggedInFlag };
};

const onLogoutSuccess = (state, payload) => {
  const logoutMessage = payload;
  return {
    ...state,
    logoutMessage,
    loading: false,
    user: { isAuthenticated: false },
  };
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return getUserSuccess(state, action.payload);
    case GET_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: 'getting user issue',
      };
    case LOGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return onLoginSuccess(state, action.payload);
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: 'login api issue',
      };
    case LOGOUT:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_SUCCESS:
      return onLogoutSuccess(state, action.payload);
    case LOGOUT_ERROR:
      return {
        ...state,
        loading: false,
        error: 'logout api issue',
      };

    default:
      return state;
  }
};
