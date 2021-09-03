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
import Jawad from '../images/JawadDactic.jpg';
import Malik from '../images/MalikDactic.jpg';
import Mujtaba from '../images/mujDactic.jpg';
import Najeeb from '../images/NajeebDactic.jpg';

const { Title, Text } = Typography;
const { Meta } = Card;

const StyledTextColumn = styled(Col)`
  &&& {
    text-align: left;
    display: flex !important;
    justify-content: center;
    flex-direction: column;
}
  }
`;

const TextBodyStyle = styled(Text)`
  font-size: 1.5em;
`;
const TextBodyBoldStyle = styled(TextBodyStyle)`
  font-weight: bold;
`;

const RowCenter = styled(Row)`
  display: flex;
  justify-content: center;
`;

const CardShadow = styled(Card)`
  &&& {
    border-radius: 2%;
  }
`;

function AboutUsPage() {
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
          <StyledTextColumn style={isMobile ? { padding: '0' } : {}}>
            <br />
            <RowCenter>
              <Title style={{ color: '#5222D0', fontSize: '3em' }}>TEAM</Title>
            </RowCenter>
            <br />
            <br />

            <RowCenter>
              <Col xs={24} sm={24} md={10} lg={10}>
                <CardShadow
                  hoverable
                  cover={<Image src={Jawad} preview={false} />}
                  xs={24}
                  sm={24}
                  md={8}
                  lg={8}
                >
                  <Meta
                    title="Jawad Ali"
                    description="Jawad is our Growth and Marketing guy. 

He has accelerated the growth of two early stage start-ups to profitable positions. He has worked in the domains of ed-tech and gaming. The culmination of which gave an edgy flare to Dactic. 

He loves to dabble in design, marketing and customer experience. If you are ever in doubt in regards to these areas, go to Jawad.

You can often find him binging on memes and motivating his friends to do better.
"
                  />
                </CardShadow>
              </Col>
            </RowCenter>
            <br />

            <RowCenter>
              <Col xs={24} sm={24} md={10} lg={10}>
                <CardShadow
                  hoverable
                  cover={<Image src={Malik} preview={false} />}
                >
                  <Meta
                    title="Abdul Malik"
                    description="Malik is our Product guy. Most of what you see on Dactic is made by him.

                Malik has worked on projects with enormous scales at Deloitte. He then went on to work at Ivan on Tech, a leading online ed-tech platform for blockchain with 300K subscribers on Youtube.
                
                He is an absolute tech wiz and a block-chain expert.  We often love to call him the Richard Hendriks of the team. (Silicon Valley ref.)
                
                You can usually find him trading and teaching others on investing."
                  />
                </CardShadow>
              </Col>
            </RowCenter>

            <br />
            <RowCenter>
              <Col xs={24} sm={24} md={10} lg={10}>
                <CardShadow
                  hoverable
                  cover={<Image src={Mujtaba} preview={false} />}
                >
                  <Meta
                    title="Mujtaba Furqan"
                    description="Mujtaba is our Dark Horse. Most of what you don’t see on Dactic is made by him.

                    Mujtaba has worked on building solutions that have saved millions of dollars for JP Morgan. 
                    
                    He is our back-end wiz and our disciplinarian. He keeps us on path and stops us from diverting. 
                    
                    After work, you can find him digging through history books and podcasts and cheering for his favourite football team - Manchester United. "
                  />
                </CardShadow>
              </Col>
            </RowCenter>
            <br />
            <RowCenter>
              <Col xs={24} sm={24} md={10} lg={10}>
                <CardShadow
                  hoverable
                  cover={<Image src={Najeeb} preview={false} />}
                >
                  <Meta
                    title="Abdul Najeeb"
                    description="Najeeb is our Data and Numbers guy. 

                    Najeeb has a Master’s in Industrial Engineering from Clemson University and currently works as a Data Scientist for The US Department of Health Care Finance, Washington DC.
                    
                    He makes sure that the answers on Dactic are easier to find. He loves researching and analyzing data. Yes, “loves”. We don’t know how.
                    
                    Whenever he isn’t working, he is either gaming or talking to one of us!"
                  />
                </CardShadow>
              </Col>
            </RowCenter>

            <br />
            <br />
          </StyledTextColumn>
        </RowCenter>
      </Card>
    </div>
  );
}

AboutUsPage.propTypes = {};

export default AboutUsPage;
