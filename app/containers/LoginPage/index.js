/**
 *
 * LoginPage
 *
 */

import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import request from 'utils/request';

// import { FormattedMessage } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import Lottie from 'react-lottie';
import { Col, Card, Row, Typography } from 'antd';
import GoogleButton from 'react-google-button';
// import { googleLoginAction } from './actions';
// import makeSelectLoginPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
// import messages from './messages';
import GlobalContext from '../App/globalContext';
import loginAnimation from './LoginColored.json';
import H3 from '../../components/H3/index';
const { Title } = Typography;

export function LoginPage(props) {
  const loginAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: loginAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const context = useContext(GlobalContext);

  useEffect(() => {
    // Pass in a callback function!
  }, []);

  // const [user, setUser] = useState('sfsdjfnsk');
  // useInjectReducer({ key: 'loginPage', reducer });
  // useInjectSaga({ key: 'loginPage', saga });
  function onLoginClick() {
    console.log('click works');
    // context.getUserDispatcher('loginuser');
    // context.loginUserDispatcher();

    // props.onLoginCall();
  }

  return (
    <div style={{ height: '80%', display: 'flex', alignItems: 'center' }}>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <Card bordered={false} style={{ width: '100%' }}>
        <Row>
          <Col xs={24} sm={24} md={14} lg={14}>
            <Title
              style={{
                color: '#5222D0',
                textAlign: 'center',
                paddingTop: '1rem',
              }}
            >
              Sign In
            </Title>
            <Row>
              <Col
                span={12}
                style={{
                  padding: '1rem',
                  borderRight: '1px solid',
                  borderColor: 'lightgrey',
                }}
              >
                <H3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  FOR USERS
                </H3>
                <Row justify="center">
                  <GoogleButton
                    type="light"
                    label="Sign In"
                    onClick={() =>
                      window.open(
                        `${process.env.BASE_URL}/auth/google?role=user`,
                        '_self',
                        'noopener,noreferrer',
                      )
                    }
                  />
                </Row>
              </Col>

              <Col span={12} style={{ padding: '1rem' }}>
                <H3 style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  FOR EXPERTS
                </H3>

                <Row justify="center">
                  <GoogleButton
                    type="light"
                    label="Sign In"
                    onClick={() =>
                      window.open(
                        `${process.env.BASE_URL}/auth/google?role=expert`,
                        '_self',
                        'noopener,noreferrer',
                      )
                    }
                  />
                </Row>
              </Col>
            </Row>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10}>
            <Lottie options={loginAnimationOptions} height={400} width={400} />
          </Col>
        </Row>
      </Card>
    </div>
  );
}

LoginPage.propTypes = {
  onLoginCall: PropTypes.func.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   loginPage: makeSelectLoginPage(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     onLoginCall: () => dispatch(googleLoginAction()),
//   };
// }

// const withConnect = connect(
//   // mapStateToProps,
//   null,
//   mapDispatchToProps,
// );

export default LoginPage;
// export default LoginPage;
