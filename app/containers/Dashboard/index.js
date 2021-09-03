/**
 *
 * Dashboard
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import { Layout, Menu, Typography, Button } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  AppleFilled,
  UploadOutlined,
} from '@ant-design/icons';
import DashboardState from './DashboardState';
import DisciplinesList from './DisciplinesListComponent';
import UserInputQuery from './UserInputQuery';
import OpenQueryComponent from './OpenQueryComponent';
import ExpertNewQueryList from './ExpertNewQueryList';
import GlobalContext from '../App/globalContext';
import HistoryComponent from './HistoryComponent';
import ProfileComponent from '../../components/ProfileComponent';
import { COLORS } from '../../colors';
import logoDactic from '../../images/logoDactic.png';

import './index.css';
import {
  RiChatNewLine,
  RiQuestionAnswerLine,
  RiChatHistoryLine,
} from 'react-icons/ri';
const { Sider, Content, Footer, Header } = Layout;
const { Text } = Typography;
const styles = {
  navBar: {
    // backgroundColor: COLORS.primary,
    borderRight: '1px solid #D3D3D3',
  },
  navHeader: {
    // backgroundColor: COLORS.primary,
    backgroundColor: 'white',
  },
  navMenu: {
    backgroundColor: COLORS.primary,
    borderRight: '0',
    color: 'white',
  },
  navMenuItem: {},
};
export function Dashboard() {
  const globalContext = useContext(GlobalContext);

  const [collapsed, setCollapsed] = useState(false);
  const [disciplineSelected, setDisciplineSelected] = useState('');
  const [subDisciplineSelected, setSubDisciplineSelected] = useState('');
  const [queryCreated, setQueryCreated] = useState('');

  const [sideMenuSelected, setSideMenuSelected] = useState('');

  useEffect(() => {
    console.log('RERENDERED');
    // rerender the dashboard once the query is created!
  }, [sideMenuSelected]);

  const toggle = collapsedArgument => {
    setCollapsed(collapsedArgument);
  };

  const SideMenuClicked = ({ item, key, keyPath, domEvent }) => {
    // console.log('clickeddd', typeof key, key, keyPath);
    setSideMenuSelected(key);
  };

  const submitQuery = () => {
    // console.log('query submitted');

    setSideMenuSelected('Open Query');
    // setQueryCreated('Open Query');
  };

  return (
    <DashboardState>
      <Layout style={{ minHeight: '100vh' }}>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>

        <Sider theme="light" position="fixed" style={styles.navBar}>
          <Header style={styles.navHeader}>
            <Link to="/">
              <img
                src={logoDactic}
                alt="logoDactic"
                style={{ height: '3rem' }}
              />
            </Link>
          </Header>
          <div className="logo" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={SideMenuClicked}
            selectedKeys={[sideMenuSelected]}
            // theme="light"
          >
            <Menu.Item
              key="New Query"
              icon={
                <span style={{ paddingRight: '0.5rem' }}>
                  <RiChatNewLine />
                </span>
              }
              className="navMenuItemSelect"
            >
              New Query
            </Menu.Item>
            <Menu.Item
              key="Open Query"
              icon={
                <span style={{ paddingRight: '0.5rem' }}>
                  <RiQuestionAnswerLine />
                </span>
              }
            >
              Open Query
            </Menu.Item>
            <Menu.Item
              key="History"
              icon={
                <span style={{ paddingRight: '0.5rem' }}>
                  <RiChatHistoryLine />
                </span>
              }
            >
              History
            </Menu.Item>
            <Menu.Item key="Profile" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="whiteBackgroundLayout">
          <Content>
            {sideMenuSelected === 'New Query' &&
              globalContext.user.role === 'user' && (
                <DisciplinesList
                  setDisciplineSelected={setDisciplineSelected}
                  setSubDisciplineSelected={setSubDisciplineSelected}
                  disciplineSelected={disciplineSelected}
                  subDisciplineSelected={subDisciplineSelected}
                  submitQuery={submitQuery}
                />
            )}

            {sideMenuSelected === 'New Query' &&
              globalContext.user.role === 'expert' && <ExpertNewQueryList />}

            {sideMenuSelected === 'Open Query' && <OpenQueryComponent />}

            {sideMenuSelected === 'History' && <HistoryComponent />}

            {sideMenuSelected === 'Profile' && <ProfileComponent />}
          </Content>
        </Layout>
      </Layout>
    </DashboardState>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
