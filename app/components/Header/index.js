import React, { useContext, useState, useEffect } from 'react';

import { Layout, Menu, Col, Row, Typography, Button } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { slide as MobileMenu } from 'react-burger-menu';

import { Link, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import GlobalContext from '../../containers/App/globalContext';
import logoDactic from '../../images/logoDactic.png';
import './index.css';

const { Header } = Layout;
const { Title } = Typography;

const StyledMenuItemText = styled.span`
  &&& {
    color: black;
    font-weight: 600;
  }
`;

function HeaderMain() {
  const globalContext = useContext(GlobalContext);
  const [currentSelection, setCurrentSelection] = useState('/');
  const [menuHidden, setMenuHidden] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Pass in a callback function!
  }, []);

  function onLogoutClick() {
    globalContext.logoutUserDispatcher();
  }

  function isMenuOpen(state) {
    return state.isOpen ? setMenuHidden(false) : setMenuHidden(true);
  }

  const styles = {
    // burger styles
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      fontSize: '1.5em',
      // height: '30px',
      // left: '36px',
      // top: '36px',
    },
    bmBurgerBars: {
      background: '#373a47',
    },
    bmBurgerBarsHover: {
      background: '#a90000',
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: '#bdc3c7',
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
    },
    // the menu items styles
    bmMenu: {
      background: 'white',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
    },
    // bmMorphShape: {
    //   fill: '#373a47',
    // },
    // bmItemList: {
    //   color: '#b8b7ad',
    //   padding: '0.8em',
    // },
    // bmItem: {
    //   display: 'inline-block',
    // },
    // bmOverlay: {
    //   background: 'rgba(0, 0, 0, 0.3)',
    // },
  };

  function RenderLoginButton() {
    return globalContext.user.isAuthenticated === true ? (
      <Button
        type="primary"
        shape="round"
        style={{ background: '#b23b3b', borderColor: '#b23b3b' }}
        onClick={onLogoutClick}
      >
        Logout
      </Button>
    ) : (
      <Link to="/login">
        <Button
          type="primary"
          shape="round"
          style={{
            background: '#EC615B',
            borderColor: '#EC615B',
          }}
        >
          Login
        </Button>
      </Link>
    );
  }

  /**
   *
   * Didnt workk, not used
   */
  // const handleClick = e => {
  //   console.log('click ', e);
  //   setCurrentSelection(e.key);
  //   return <Redirect to="/login" />;
  // };

  return (
    <div style={{ background: '#fff' }}>
      {isMobile ? (
        <Header style={{ background: '#fff', padding: '0px' }}>
          <Row style={{ justifyContent: 'space-around' }}>
            <Col span={8}>
              <MobileMenu
                onStateChange={isMenuOpen}
                width="50%"
                styles={styles}
                customBurgerIcon={<MenuUnfoldOutlined />}
              >
                <Link to="/whydactic">
                  <Button type="link">
                    <StyledMenuItemText>WHY DACTIC?</StyledMenuItemText>
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button type="link">
                    <StyledMenuItemText>DASHBOARD</StyledMenuItemText>
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button type="link">
                    <StyledMenuItemText>PRICING</StyledMenuItemText>
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button type="link">
                    <StyledMenuItemText>BLOG</StyledMenuItemText>
                  </Button>
                </Link>
                <Link to="/support">
                  <Button type="link">
                    <StyledMenuItemText>SUPPORT</StyledMenuItemText>
                  </Button>
                </Link>
                {RenderLoginButton()}
              </MobileMenu>
            </Col>

            <Col span={8} style={{ textAlign: 'center' }}>
              <Link to="/">
                <img
                  src={logoDactic}
                  alt="logoDactic"
                  style={{ height: '3rem' }}
                />
              </Link>
            </Col>
            <Col span={8} />
          </Row>
        </Header>
      ) : (
        <Header style={{ background: '#fff' }}>
          <Menu
            theme="light"
            // onClick={handleClick}
            mode="horizontal"
            defaultSelectedKeys={['2']}
            selectedKeys={[currentSelection]}
          >
            <Row>
              <Col span={5}>
                <Menu.Item key="/" span={7}>
                  <Link to="/">
                    <Title
                      level={3}
                      style={{
                        color: '#5222D0',
                        paddingTop: '0.5rem',
                        paddingLeft: '4em',
                      }}
                    >
                      <img
                        src={logoDactic}
                        alt="logoDactic"
                        style={{ height: '3rem' }}
                      />
                    </Title>
                  </Link>
                </Menu.Item>
              </Col>
              <Col
                span={14}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  display: 'flex',
                }}
              >
                <Menu.Item key="/why" style={{ textAlign: 'center' }}>
                  <Link to="/whydactic">
                    <Button type="link">
                      {' '}
                      <StyledMenuItemText>WHY DACTIC?</StyledMenuItemText>
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/dashboard" style={{ textAlign: 'center' }}>
                  <Link to="/dashboard">
                    <Button type="link">
                      <StyledMenuItemText>DASHBOARD</StyledMenuItemText>
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/pricing" style={{ textAlign: 'center' }}>
                  <Link to="/pricing">
                    <Button type="link">
                      <StyledMenuItemText>PRICING</StyledMenuItemText>
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/blog">
                  <Link to="/blog">
                    <Button type="link">
                      <StyledMenuItemText>BLOG</StyledMenuItemText>
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item key="/support">
                  <Link to="/support">
                    <Button type="link">
                      <StyledMenuItemText>SUPPORT</StyledMenuItemText>
                    </Button>
                  </Link>
                </Menu.Item>
              </Col>
              <Col span={5}>
                <Menu.Item style={{ textAlign: 'right' }} key="6">
                  {RenderLoginButton()}
                </Menu.Item>
              </Col>
            </Row>
          </Menu>
        </Header>
      )}
    </div>
  );
}

export default HeaderMain;
