import React, { useEffect, useContext, useState } from 'react';
import { Layout, Menu, Typography, List, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import DashboardContext from './dashboardContext';
import ChatWindow from './ChatWindow';
import GlobalContext from '../App/globalContext';
import MenuCard from '../../components/MenuCard';

const { Sider, Header, Content, Footer } = Layout;
const { Text } = Typography;

export function HistoryComponent(props) {
  const globalContext = useContext(GlobalContext);
  const context = useContext(DashboardContext);
  const [chatDetails, setChatDetails] = useState(null);
  useEffect(() => {
    context.getHistoryQueries();
  }, []);

  const handleQueryClick = chatId => {
    context.historyQueriesList.forEach(query => {
      if (chatId === query.id) setChatDetails(query);
    });
  };
  const sort = array => {
    if (array) {
      return array.sort(
        (a, b) => new Date(b.startedTimestamp) - new Date(a.startedTimestamp),
      );
    }
  };
  return (
    <React.Fragment>
      <Layout className="site-layout">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            background: 'white',
            borderRight: '1px solid',
          }}
          width={400}
        >
          <div className="logo" />
          <Header style={{ backgroundColor: '#5C40A7' }}>
            <Text level={5} style={{ color: 'white' }}>
              History
            </Text>
          </Header>
          <List
            // style={{ paddingLeft: '2rem' }}
            dataSource={sort(context.historyQueriesList)}
            renderItem={item => (
              <MenuCard query={item} onClick={handleQueryClick} />
            )}
            onClic
          />
        </Sider>

        <Layout style={{ height: '100vh' }}>
          <Header style={{ backgroundColor: '#5C40A7' }}>
            {chatDetails && (
              <Text level={8} style={{ color: 'white', textAlign: 'left' }}>
                {chatDetails.title}
              </Text>
            )}
          </Header>

          <Content
            className="site-layout-background"
            style={{
              height: '100%',
            }}
          >
            {chatDetails ? (
              <ChatWindow
                chatDetails={chatDetails}
                userId={globalContext.user.userId}
                role={globalContext.user.role}
                isHistory
              />
            ) : (
              <Empty
                style={{ paddingTop: '20vh' }}
                description="You dont have any queries opened right now. "
              />
            )}
          </Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

HistoryComponent.propTypes = {};

export default HistoryComponent;
