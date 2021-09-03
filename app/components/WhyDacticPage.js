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
  padding-right: 2em;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  white-space: pre-line;
  &&& {
    border-radius: 2%;
  }
`;

function WhyDacticPage() {
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
            md={24}
            lg={24}
          >
            <br />
            <CardShadow>
              <Title
                style={{
                  color: '#5222D0',
                  fontSize: '3em',
                  fontWeight: 'bold',
                }}
              >
                WHY DACTIC?
              </Title>
              <TextBodyStyle>
                Have you ever gotten stuck on a problem which would have been
                solved just by asking an expert who has already gone through
                that problem?
              </TextBodyStyle>
              <br />
              <br />
              <TextBodyStyle>We are 4 founders consisting of </TextBodyStyle>
              <TextBodyBoldStyle>
                a marketer, a data scientist, a front end developer, and a back
                end developer
              </TextBodyBoldStyle>
              <TextBodyStyle>.</TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                We have had the same problem time and time again. Be it on the
                job or in our personal projects. It delayed a lot of work, and
                sometimes even took weeks to find the solution. In a world where
                time is money, we were losing money. The main problem was access
                to these expert individuals, and even if we had access to these
                &nbsp;
              </TextBodyStyle>

              <TextBodyBoldStyle>
                Mentors (as we like to call them)
              </TextBodyBoldStyle>
              <TextBodyStyle>
                , we had to be cautious of their availability and their
                willingness to help out.
              </TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                You may also think ‘Why not Google it?’ , well in our experience
                Google has brilliant solutions to general problems but doesn’t
                help so much when it gets a tad bit more specific, especially in
                a professional domain.
              </TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                Basically, what we are trying to tell you is that it takes a
                long time to resolve a specific use case problem. Hence we
                thought of Dactic - a platform that allows you to connect with
                mentors of your field on demand and get your queries resolved.
              </TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                Let’s say you are working on building an app for the first time.
                You want to build it, launch it on the play store and grow the
                app. Throughout the process you are going to come across highly
                specific problems, be it a coding problem or knowing how to
                market the app.
              </TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                With Dactic you would have access to Mentors across various
                fields to help you through this journey, saving you time and
                resources. Dactic helps you in filling those knowledge gaps and
                helps you find the right solution to your problems.We don&apos;t
                believe learning is a single step process, like taking a course
                or acquiring a degree, but is a continuous effort to improve
                one&apos;s knowledge and skill.
              </TextBodyStyle>
              <br />
              <br />

              <TextBodyStyle>
                We are still growing and want to bring more disciplines and
                subdisciplines for students and young professionals alike. We
                hope you keep learning and growing but, remember - &nbsp;
              </TextBodyStyle>

              <TextBodyBoldStyle>
                Don’t get stuck on your projects!
              </TextBodyBoldStyle>
            </CardShadow>

            <br />
            <br />
          </StyledTextColumnLeft>
        </RowCenter>
      </Card>
    </div>
  );
}

WhyDacticPage.propTypes = {};

export default WhyDacticPage;
