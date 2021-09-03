import React from 'react';

export default React.createContext({
  // default initial value

  disciplinesList: [],
  unacceptedQueriesList: [],
  getUnacceptedQueries: [],
  getOpenQueries: [],
  historyQueriesList: [],
  getHistoryQueries: [],
  getDisciplinesDispatcher: () => {},
  //   removeProductFromCart: productId => {}
});
