/**
 *
 * SUPPORT Page
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Col, Card, Row, Typography, Button } from 'antd';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

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
  justify-content: center;
`;

function SupportPage() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });

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
                SUPPORT
              </Title>
            </RowCenter>
            <br />
            <Text style={{ fontSize: '1.5em' }}>
              We got you here too! send us an email at:
              developers.dactic@gmail.com
            </Text>
            <br />
            {/* <Row>
              <Text style={{ fontSize: '1.5em' }}>
                We Basically help you answer high level domain specific
                questions that Google isn&apos;t able to help you with.
              </Text>
            </Row> */}
            {/* <br /> */}
            <RowCenter>
              <Button
                type="primary"
                style={{
                  background: '#EC615B',
                  borderColor: '#EC615B',
                  boxShadow: '3px 4px 5px 0px rgba(0, 0, 0, 0.38)',
                }}
                size="large"
              >
                ASK FOR HELP
              </Button>
            </RowCenter>
          </StyledTextColumnLeft>
        </RowCenter>
      </Card>
    </div>
  );
}

SupportPage.propTypes = {};

export default SupportPage;
