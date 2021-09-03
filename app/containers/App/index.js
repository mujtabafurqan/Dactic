/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import { Switch, Route, withRouter } from 'react-router-dom';

// import { useInjectReducer } from 'utils/injectReducer';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LoginPage from 'containers/LoginPage';
import Dashboard from 'containers/Dashboard';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SupportPage from 'components/SupportPage';
import BlogPage from 'components/BlogPage';
import Terms from 'components/Terms';
import PrivacyPage from 'components/PrivacyPage';

import PricingPage from 'components/PricingPage';
import WhyDacticPage from 'components/WhyDacticPage';
import HeroPage from 'components/HeroPage';
import DetailsPage from 'containers/DetailsPage';
import AboutUsPage from 'components/AboutUsPage';
import { Layout } from 'antd';
import PrivateRoute from './PrivateRoute';

import 'antd/dist/antd.css';

import GlobalStyle from '../../global-styles';
import GlobalState from './GlobalState';

function App(props) {
  useEffect(() => {
    // console.log(props.location.search);
    // const id = new URLSearchParams(props.location.search).get('user');
    // props.getProfile(id);
  }, []);

  return (
    <GlobalState>
      <Layout
        className="layout"
        style={{ backgroundColor: 'white', height: '100vh', width: '100%' }}
      >
        <Helmet titleTemplate="%s - Dactic" defaultTitle="Dactic">
          <meta name="description" content="A Dactic application" />
        </Helmet>
        {props.location.pathname !== '/dashboard' ? <Header /> : null}
        {/* <HeroPage /> */}

        <Switch>
          <Route exact path="/" component={HeroPage} />
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/blog" component={BlogPage} />
          <Route path="/support" component={SupportPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/whydactic" component={WhyDacticPage} />
          <Route path="/terms" component={Terms} />
          <Route path="/policy" component={PrivacyPage} />
          <Route path="/aboutus" component={AboutUsPage} />

          <Route path="/details" component={DetailsPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        {props.location.pathname !== '/dashboard'
          ? [
              props.location.pathname !== '/' ? (
                <div
                  style={{
                    marginTop: 'auto',
                  }}
                >
                  <Footer />
                </div>
              ) : (
                <Footer />
              ),
            ]
          : null}
      </Layout>
    </GlobalState>
  );
}

App.propTypes = {
  // getProfile: PropTypes.func.isRequired,
};

export default withRouter(App);
