import React from 'react';

export default React.createContext({
  // default initial value

  user: { name: 'malik', value: 'awesomness', role: 'expert' },
  getUserDispatcher: () => {},
  loginUserDispatcher: () => {},
  loggedInFlag: {
    authenticated: false,
  },
  loading: true,
  //   removeProductFromCart: productId => {}
});
