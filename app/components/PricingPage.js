/**
 *
 * HeroPage
 *
 */

import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Col, Card, Row, Typography } from 'antd';

import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { TiTick } from 'react-icons/ti';
import DacticButton from './DacticButton';

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

const RowCenter = styled(Row)`
  display: flex;
  justify-content: space-evenly;
`;

const DescriptionText = styled(Text)`
  font-size: larger;
`;

function PricingCard(props) {
  return (
    <Card hoverable style={{ width: 350 }}>
      <Row>
        {/* <h1> */}
        <Title strong level={2}>
          {props.name}
        </Title>
        {/* </h1> */}
      </Row>
      <Row>
        <Title strong level={3}>
          {props.price}
        </Title>
      </Row>
      <Row>
        <DacticButton>Free 14-day Trial</DacticButton>
      </Row>
      <br />
      <Row>
        <Title level={5}>{props.description}</Title>
      </Row>
      <Row>
        <DescriptionText>
          Free for Individuals
          <br />
          <TiTick />
          No of Questions: {props.noOfQuestions}
          <br />
          <TiTick />
          No of Disciplines: {props.noOfDisciplines}
          <br />
        </DescriptionText>
      </Row>
    </Card>
  );
}

function PricingPage() {
  const context = useContext(GlobalContext);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

  useEffect(() => {
    const handleWindowResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

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
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>
                PRICING
              </Title>
            </RowCenter>

            <br />

            <br />
          </StyledTextColumnLeft>
        </RowCenter>
        <RowCenter gutter={[8, 24]}>
          <Col>
            <PricingCard
              description="For people who take up side projects or are freelancing"
              name="Hobbyist"
              price="INR 1997"
              noOfQuestions="15"
              noOfDisciplines="2"
            />
          </Col>
          <Col>
            <PricingCard
              description="For people who are working in a company and require frequent assistance on their projects "
              name="Professional"
              price="INR 3997"
              noOfQuestions="30"
              noOfDisciplines="Unlimited"
            />
          </Col>
          <Col>
            <PricingCard
              description="For people managing multiple verticles or projects. Eg: Product or Project Managers"
              name="High Performers"
              price="INR 6657"
              noOfQuestions="50"
              noOfDisciplines="Unlimited"
            />
          </Col>
        </RowCenter>
      </Card>
    </div>
  );
}

PricingPage.propTypes = {};

export default PricingPage;
