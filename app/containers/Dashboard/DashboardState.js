/* eslint-disable object-shorthand */
import React, { useEffect, useReducer } from 'react';
import request from 'utils/request';

import DashboardContext from './dashboardContext';
import {
  dashboardReducer,
  GET_DISCIPLINES,
  GET_DISCIPLINES_SUCCESS,
  GET_DISCIPLINES_ERROR,
  SUBMIT_USER_QUERY,
  SUBMIT_USER_QUERY_SUCCESS,
  SUBMIT_USER_QUERY_ERROR,
  GET_USER_OPEN_QUERIES,
  GET_USER_OPEN_QUERIES_SUCCESS,
  GET_USER_OPEN_QUERIES_ERROR,
  SEND_USER_MESSAGE,
  SEND_USER_MESSAGE_SUCCESS,
  SEND_USER_MESSAGE_ERROR,
  GET_UNACCEPTED_QUERIES,
  GET_UNACCEPTED_QUERIES_SUCCESS,
  GET_UNACCEPTED_QUERIES_ERROR,
  GET_HISTORY_QUERIES,
  GET_HISTORY_QUERIES_SUCCESS,
  GET_HISTORY_QUERIES_ERROR,
} from './reducer';

const DashboardState = props => {
  const [dashboardState, dispatch] = useReducer(dashboardReducer, {
    disciplinesList: [],
    unacceptedQueriesList: [],
    historyQueriesList: [],
    submitUserQuerySuccess: false,
  });

  useEffect(() => {
    // Pass in a callback function!
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      dispatch({ type: GET_DISCIPLINES });
      try {
        const datafromAPI1 = await request('/v1/dashboard/getDisciplines', {
          signal: signal,
        });
        // datafromAPI1 = {
        //   Marketing: [
        //     'Growth Hacking',
        //     'FB Marketing',
        //     'Insta Influencer',
        //     'Google Ads',
        //   ],
        //   Programming: ['React', 'Angular', 'Python'],
        //   Blockchain: ['Bitcoin', 'Ethereum'],
        // };

        dispatch({ type: GET_DISCIPLINES_SUCCESS, payload: datafromAPI1 });
      } catch (error) {
        dispatch({ type: GET_DISCIPLINES_ERROR });
      }
    };

    fetchData();
  }, []);

  const submitQueryDispatcher = async userQueryObject => {
    console.log(userQueryObject, 'in state');
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: SUBMIT_USER_QUERY });
    try {
      // righht now we dont get response
      // for testing
      const chatID = await request('/v1/dashboard/createChat', {
        signal,
        method: 'POST',
        body: JSON.stringify(userQueryObject),
        headers: {
          'Content-Type': `application/json; charset=UTF-8`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      dispatch({ type: SUBMIT_USER_QUERY_SUCCESS, payload: chatID });
    } catch (error) {
      dispatch({ type: SUBMIT_USER_QUERY_ERROR });
    }
  };

  const getOpenQueriesDispatcher = async userId => {
    console.log(userId, 'in state');
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: GET_USER_OPEN_QUERIES });
    try {
      const openQueries = await request(`/v1/dashboard/openChats`, {
        signal,
      });
      dispatch({ type: GET_USER_OPEN_QUERIES_SUCCESS, payload: openQueries });
      return true;
    } catch (error) {
      dispatch({ type: GET_USER_OPEN_QUERIES_ERROR });
    }
  };

  const sendMessageDispatcher = async (chatId, message) => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: SEND_USER_MESSAGE });
    try {
      // righht now we dont get response
      // const messageSentId = 45345; // for testing

      // for testing
      console.log('messageObject', message);
      const messageObject = {
        message: {
          // userOrExpertId: '12345',
          content: message.content,
          // role: 'user',
          readStatus: message.read,
        },
      };
      const messageSentId = await request(
        `/v1/dashboard/newMessage/${chatId}`,
        {
          method: 'PUT',
          body: JSON.stringify(messageObject),
          headers: {
            'Content-Type': `application/json; charset=UTF-8`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      dispatch({ type: SEND_USER_MESSAGE_SUCCESS, payload: messageSentId });
    } catch (error) {
      dispatch({ type: SEND_USER_MESSAGE_ERROR });
    }
  };

  const getUnacceptedQueriesDispatcher = async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: GET_UNACCEPTED_QUERIES });
    try {
      const unacceptedQueries = await request(
        `/v1/dashboard/getUnacceptedChats`,
        {
          signal,
        },
      );
      dispatch({
        type: GET_UNACCEPTED_QUERIES_SUCCESS,
        payload: unacceptedQueries,
      });
    } catch (error) {
      dispatch({ type: GET_UNACCEPTED_QUERIES_ERROR });
    }
  };

  const getHistoryQueriesDispatcher = async () => {
    const abortController = new AbortController();
    const { signal } = abortController;
    dispatch({ type: GET_HISTORY_QUERIES });
    try {
      const historyQueries = await request('/v1/dashboard/getHistory', {
        signal,
      });
      dispatch({
        type: GET_HISTORY_QUERIES_SUCCESS,
        payload: historyQueries,
      });
    } catch (error) {
      dispatch({ type: GET_HISTORY_QUERIES_ERROR });
    }
  };

  return (
    <DashboardContext.Provider
      // value is the global state present for all children components
      // below properties are available throughout app
      value={{
        // products: products,
        disciplinesList: dashboardState.disciplinesList,
        submitUserQuerySuccess: dashboardState.submitUserQuerySuccess,
        chatId: dashboardState.chatId,
        userOpenQueries: dashboardState.userOpenQueries,
        unacceptedQueriesList: dashboardState.unacceptedQueriesList,
        historyQueriesList: dashboardState.historyQueriesList,
        submitUserQuery: submitQueryDispatcher,
        getOpenQueries: getOpenQueriesDispatcher,
        sendMessage: sendMessageDispatcher,
        getUnacceptedQueries: getUnacceptedQueriesDispatcher,
        getHistoryQueries: getHistoryQueriesDispatcher,
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
