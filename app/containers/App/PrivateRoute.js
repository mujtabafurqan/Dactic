import React, { useContext, useState, useLayoutEffect } from 'react';
import { Spin } from 'antd';
import { Route, Redirect } from 'react-router-dom';
import GlobalContext from './globalContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children, ...rest }) => {
  const globalContext = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function fetchMyAPI() {
      await globalContext.getUserDispatcher();
      setLoading(false);
    }
    fetchMyAPI();
  }, []);

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Route
          {...rest}
          render={() =>
            globalContext.user.isAuthenticated === true ? (
              children
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      )}
    </div>
  );
};

export default PrivateRoute;
