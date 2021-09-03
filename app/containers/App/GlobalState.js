/* eslint-disable object-shorthand */
import React, { useReducer, useEffect } from 'react';
import request from 'utils/request';

import GlobalContext from './globalContext';
import {
  appReducer,
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './reducer';

const GlobalState = props => {
  const [appState, dispatch] = useReducer(appReducer, {
    user: { userId: '12345', role: 'user' },
    loading: true,
  });

  useEffect(() => {
    getUserDispatcher();
  }, []);

  const getUserDispatcher = async inputuser => {
    const userid = inputuser || 'lol';
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: GET_USER });
    try {
      // righht now we dont get response
      const userDetails = await request('/v1/auth/login', {
        signal,
      });
      dispatch({ type: GET_USER_SUCCESS, payload: userDetails });
    } catch (error) {
      dispatch({ type: GET_USER_ERROR });
    }
  };

  /**
   * not used right now
   */
  const loginUserDispatcher = async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: LOGIN });
    try {
      // righht now we dont get response
      const loginResponse = await request('/v1/auth/login', {
        signal,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: loginResponse });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR });
    }
  };

  const logoutUserDispatcher = async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: LOGOUT });
    try {
      // righht now we dont get response
      const logoutResponse = await request('/v1/auth/logout', {
        signal,
      });
      dispatch({ type: LOGOUT_SUCCESS, payload: logoutResponse });
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR });
    }
  };

  const checkAuthenticatedDispatcher = async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: LOGIN });
    try {
      // righht now we dont get response
      const isAuthenticatedDetails = await request('/v1/auth/login', {
        signal,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: isAuthenticatedDetails });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR });
    }
  };

  return (
    <GlobalContext.Provider
      // value is the global state present for all children components
      // below properties are available throughout app
      value={{
        // products: products,
        user: appState.user,
        getUserDispatcher: getUserDispatcher,
        loginUserDispatcher: loginUserDispatcher,
        checkAuthenticatedDispatcher: checkAuthenticatedDispatcher,
        loggedInFlag: appState.loggedInFlag,
        logoutUserDispatcher: logoutUserDispatcher,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalState;
