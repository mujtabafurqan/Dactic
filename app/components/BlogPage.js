/**
 *
 * HeroPage
 *
 */

import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Col, Card, Row, Typography, Button, Image } from 'antd';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

import GlobalContext from '../containers/App/globalContext';

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

const RowCenter = styled(Row)`
  display: flex;
  justify-content: center;
`;

function BlogPage() {
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
        <RowCenter>
          <StyledTextColumnLeft
            style={isMobile ? { padding: '0' } : {}}
            xs={24}
            sm={24}
            md={16}
            lg={16}
            order={isMobile ? 2 : 1}
          >
            <RowCenter>
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>BLOG</Title>
            </RowCenter>
            <br />
            <Text style={{ fontSize: '1.5em' }}>Hold on Hold on!</Text>
            <br />
            <Row>
              <Text style={{ fontSize: '1.5em' }}>
                Brilliant ideas coming through….
              </Text>
            </Row>
            <br />
          </StyledTextColumnLeft>
        </RowCenter>
      </Card>
    </div>
  );
}

BlogPage.propTypes = {};

export default BlogPage;
