/**
 *
 * HeroPage
 *
 */

import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Lottie from 'react-lottie';
import { Col, Card, Row, Typography, Button, Image } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import GlobalContext from '../../containers/App/globalContext';

import HeroAnimationData from './GrowthAnimation.json';
import animationData1 from './ChatbotColourAnimation.json';
import testingTechColored from './TestingTechColored.json';
import webDevImage from './webDevelopment.png';

const { Title, Text } = Typography;

const StyledTextColumn = styled(Col)`
  &&& {
    text-align: left;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
}
  }
`;

const StyledTextColumnLeft = styled(StyledTextColumn)`
  padding-left: 2em;
  padding-right: 7em;
`;
const StyledTextColumnRight = styled(StyledTextColumn)`
  padding-left: 10em;
  padding-right: 2em;
`;

const StylesMainText = styled(Title)`
  html {
    font-size: calc(1em + 1vw);
  }
  color: '#5222D0';
`;

function HeroPage() {
  const HeroOptions = {
    loop: true,
    autoplay: true,
    animationData: HeroAnimationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const ChatbotOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const testingTechColoredOptions = {
    loop: true,
    autoplay: true,
    animationData: testingTechColored,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const context = useContext(GlobalContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // const userDetails =
  // const defaultOptions1 = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData1,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice',
  //   },
  // };
  const mobileLottieSize = screenWidth / 2;
  const desktopLottieSize = screenWidth / 3;

  return (
    <div>
      <Card bordered={false}>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8} order={isMobile ? 1 : 2}>
            <Lottie
              options={HeroOptions}
              height={isMobile ? mobileLottieSize : desktopLottieSize}
              width={isMobile ? mobileLottieSize : desktopLottieSize}
            />
          </Col>
          <StyledTextColumnLeft
            style={isMobile ? { padding: '0' } : {}}
            xs={24}
            sm={24}
            md={16}
            lg={16}
            order={isMobile ? 2 : 1}
          >
            <Row>
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>
                Don&apos;t get stuck on your projects!
              </Title>
            </Row>
            <br />
            <Text style={{ fontSize: '1.5em' }}>
              Whether you are working on marketing or data science projects,
              Dactic makes it easier for you to fill your knowledge gaps so that
              you never have to stop working on your favourite projects.
            </Text>
            <br />
            <Row>
              <Text style={{ fontSize: '1.5em' }}>
                We Basically help you answer high level domain specific
                questions that Google isn&apos;t able to help you with.
              </Text>
            </Row>
            <br />
            <Row>
              <Link to="/login">
                <Button
                  type="primary"
                  style={{
                    background: '#EC615B',
                    borderColor: '#EC615B',
                    boxShadow: '3px 4px 5px 0px rgba(0, 0, 0, 0.38)',
                  }}
                  size="large"
                >
                  Start Trial
                </Button>
              </Link>
            </Row>
          </StyledTextColumnLeft>
        </Row>
      </Card>
      <Card bordered={false} style={{ width: '100%', padding: '3vw' }}>
        <Row>
          <Col xs={24} sm={24} md={8} lg={8}>
            <Lottie
              options={ChatbotOptions}
              height={isMobile ? mobileLottieSize : desktopLottieSize}
              width={isMobile ? mobileLottieSize : desktopLottieSize}
            />
          </Col>
          <StyledTextColumnRight
            style={isMobile ? { padding: '0' } : {}}
            xs={24}
            sm={24}
            md={16}
            lg={16}
          >
            <Row>
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>
                Get your answers in various disciplines
              </Title>
            </Row>
            <br />

            <Text level={5} style={{ fontSize: '1.5em' }}>
              We connect you to subject matter experts who help you solve your
              specific issues within 24 hours.
            </Text>
            <br />
            <Row>
              <Text level={5} style={{ fontSize: '1.5em' }}>
                We currently have experts in Marketing, Data Science & Web
                Development.
              </Text>
            </Row>
          </StyledTextColumnRight>
        </Row>
      </Card>
      <Card bordered={false} style={{ width: '100%', padding: '3vw' }}>
        <Row>
          <StyledTextColumnLeft
            style={isMobile ? { padding: '0' } : {}}
            xs={24}
            sm={24}
            md={16}
            lg={16}
            order={isMobile ? 2 : 1}
          >
            <Row>
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>
                Get ahead of the curve to become a specialist in your field
              </Title>
            </Row>
            <br />

            <Text style={{ fontSize: '1.5em' }}>
              Our subject matter experts have a wealth of experience in their
              domains to help you master your skills.
            </Text>
            <br />
            {/* <Row>
              <Text style={{ fontSize: '1.5vw' }}>
                We Basically help you answer high level domain specific
                questions that Google isn&apos;t able to help you with
              </Text>
            </Row> */}
            <br />
          </StyledTextColumnLeft>
          <Col xs={24} sm={24} md={8} lg={8} order={isMobile ? 1 : 2}>
            <Lottie
              options={testingTechColoredOptions}
              height={isMobile ? mobileLottieSize : desktopLottieSize}
              width={isMobile ? mobileLottieSize : desktopLottieSize}
            />
          </Col>
        </Row>
      </Card>
      <Card
        bordered={false}
        style={{ width: '100%', padding: '3vw' }}
        bodyStyle={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Image src={webDevImage} preview={false} width="90%" />
        <Title
          style={{ color: '#5222D0', fontSize: '3em', textAlign: 'center' }}
        >
          We have got your back! Keep Goin'!
        </Title>
      </Card>
    </div>
  );
}

HeroPage.propTypes = {};

export default HeroPage;
