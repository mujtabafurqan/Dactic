import React from 'react';

import { Layout, Col, Row, Divider } from 'antd';
import styled from 'styled-components';
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';
import logoDactic from '../../images/DacticWhite.png';

const { Footer } = Layout;

const StyledFooterTextHeading = styled.span`
  font-weight: bold;
`;

const CopyrightTextStyled = styled.span`
  font-weight: 400;
  text-align: left;
  color: white;
`;
const RowStyledFooter = styled(Row)``;

const LinkStyled = styled(Link)`
  color: inherit;
`;

function FooterMain() {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Layout>
      <Footer
        style={{
          textAlign: 'center',
          backgroundColor: '#5222D0',
          // position: 'sticky',
          bottom: '0',
        }}
      >
        <Row
          style={{
            display: 'flex',
            color: '#ffffff',
            justifyContent: 'space-between',
          }}
          gutter={[8, 24]}
        >
          <br />
          <Col xs={24} sm={24} md={8} lg={8} style={{ textAlign: 'left' }}>
            <LinkStyled to="/">
              <img
                src={logoDactic}
                alt="logoDactic"
                style={{ height: '3rem' }}
              />
            </LinkStyled>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={16}
            lg={16}
            style={isMobile ? { textAlign: 'left' } : { textAlign: 'right' }}
          >
            <span>
              <a
                href="https://www.linkedin.com/company/69216422"
                style={{ color: 'inherit' }}
              >
                <FaFacebookSquare size="2em" />
              </a>
              <a
                href="https://www.linkedin.com/company/69216422"
                style={{ color: 'inherit' }}
              >
                <FaTwitterSquare size="2em" />
              </a>

              <a
                href="https://www.linkedin.com/company/69216422"
                style={{ color: 'inherit' }}
              >
                <FaInstagramSquare size="2em" />
              </a>
              <a
                href="https://www.linkedin.com/company/69216422"
                style={{ color: 'inherit' }}
              >
                <FaLinkedin size="2em" />
              </a>
            </span>
          </Col>
        </Row>
        <Divider style={{ background: 'cornsilk' }} />
        <Row
          style={{
            display: 'flex',
            color: '#ffffff',
            justifyContent: 'space-between',
          }}
          gutter={[8, 24]}
        >
          <Col xs={12} sm={12} md={6} lg={6}>
            <RowStyledFooter gutter={[8, 26]}>
              <Col>
                <StyledFooterTextHeading>PRODUCT</StyledFooterTextHeading>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/whydactic">Why Dactic?</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/support">Support</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/support">Feedback</LinkStyled>
              </Col>
            </RowStyledFooter>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <RowStyledFooter gutter={[8, 26]}>
              <Col>
                <StyledFooterTextHeading>POLICIES</StyledFooterTextHeading>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/terms">Terms & Conditions</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/policy">Privacy Policy</LinkStyled>
              </Col>
            </RowStyledFooter>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <RowStyledFooter gutter={[8, 26]}>
              <Col>
                <StyledFooterTextHeading>RESOURCES</StyledFooterTextHeading>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/blog">Blog</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/pricing">Pricing</LinkStyled>
              </Col>
            </RowStyledFooter>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <RowStyledFooter gutter={[8, 26]}>
              <Col>
                <StyledFooterTextHeading>COMPANY</StyledFooterTextHeading>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/aboutus">About Us</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/partners">Partners</LinkStyled>
              </Col>
            </RowStyledFooter>
            <RowStyledFooter gutter={[8, 8]}>
              <Col>
                <LinkStyled to="/jobs">Jobs</LinkStyled>
              </Col>
            </RowStyledFooter>
          </Col>
        </Row>
        <Row>
          <CopyrightTextStyled>
            © Copyright 2021 Dactic Technologies, Inc. All rights reserved.
            Various trademarks held by their respective owners.
          </CopyrightTextStyled>
        </Row>
      </Footer>
    </Layout>
  );
}

export default FooterMain;
