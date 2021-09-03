import React, { useEffect, useContext, useState } from 'react';
import { Layout, Typography, List, message, Card, Row, Empty } from 'antd';
// import PropTypes from 'prop-types';
import request from 'utils/request';
import styled from 'styled-components';
import DashboardContext from './dashboardContext';
import ChatWindow from './ChatWindow';
import GlobalContext from '../App/globalContext';
import MenuCard from '../../components/MenuCard';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

const CardChatWindowStyled = styled(Card)`
  top: 5%;
  padding: 5px;
  height: 95%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  bottom: 5%;
`;

export function OpenQueryComponent() {
  const globalContext = useContext(GlobalContext);
  const context = useContext(DashboardContext);
  const [chatDetails, setChatDetails] = useState(null);
  useEffect(() => {
    const id = globalContext.user.userId;

    const fetchOpenQueries = async () => {
      const success = await context.getOpenQueries(id);
      console.log('SUCCESS', success);
      if (success) {
        const query =
          context.userOpenQueries && context.userOpenQueries.length > 0
            ? context.userOpenQueries[0]
            : null;
        if (query) {
          handleQueryClick(query.id);
        }
      } else {
        // Something went wrong
      }
    };

    fetchOpenQueries();

    setInterval(() => {
      context.getOpenQueries(id);
    }, 30000);
  }, []);

  // useEffect(() => {
  //   const query =
  //     context.userOpenQueries && context.userOpenQueries.length > 0
  //       ? context.userOpenQueries[0]
  //       : null;
  //   if (query) {
  //     // handleQueryClick(id);
  //     handleQueryClick(query);
  //   }
  // }, []);

  // on click of any of the queries
  const handleQueryClick = chatId => {
    console.log(
      'OPEN QUERIESS',
      context.userOpenQueries,
      context.userOpenQueries[0].id,
    );
    context.userOpenQueries.forEach(async query => {
      if (chatId === query.id) {
        await request(`/v1/dashboard/updateReadStatus/${chatId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': `application/json; charset=UTF-8`,
          },
        });
        setChatDetails(query);
        context.getOpenQueries();
      }
    });
  };

  const getUnreadCount = chatId => {
    let chat = {};
    context.userOpenQueries.forEach(query => {
      if (query.id === chatId) {
        chat = query;
      }
    });
    if (globalContext.user.role === 'user') {
      return chat.userUnreadCount;
    }

    return chat.expertUnreadCount;
  };

  const handleClose = async chatId => {
    await request(`/v1/dashboard/closeChat/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': `application/json; charset=UTF-8`,
      },
    });
    context.getOpenQueries();
    setChatDetails(null);
    message.success('Chat Closed');
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
      <Layout className="site-layout" style={{ height: '100vh' }}>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            background: 'white',
            borderRight: '1px solid #D3D3D3',
          }}
          width={400}
        >
          <Layout style={{ height: '100%' }}>
            <Header style={{ backgroundColor: '#5C40A7' }}>
              <Text level={5} style={{ color: 'white' }}>
                Open Queries
              </Text>
            </Header>
            <Card
              bordered={false}
              style={{ height: '100%', overflow: 'auto', padding: '0' }}
              bodyStyle={{ padding: '0' }}
            >
              <List
                style={{ height: '100%' }}
                dataSource={sort(context.userOpenQueries)}
                renderItem={item => (
                  <MenuCard
                    query={item}
                    unreadCount={getUnreadCount(item.id)}
                    onClick={handleQueryClick}
                    role={globalContext.user.role}
                    closeChat={handleClose}
                  />
                )}
              />
            </Card>
          </Layout>
        </Sider>
        <Layout className="site-layout-background">
          <Header
            style={{
              backgroundColor: '#5C40A7',
              position: 'fixed',
              zIndex: 1,
              width: '100%',
              top: '0px',
            }}
          >
            {chatDetails && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    color: 'white',
                    textAlign: 'left',
                    fontStyle: 'italic',
                    fontSize: '18px',
                  }}
                >
                  {`${chatDetails.title} - ${chatDetails.subDiscipline}`}
                </div>
              </div>
            )}
          </Header>
          <CardChatWindowStyled
            bodyStyle={{
              height: '100%',
            }}
            bordered={false}
          >
            {chatDetails ? (
              <ChatWindow
                chatDetails={chatDetails}
                userId={globalContext.user.userId}
                role={globalContext.user.role}
                handleClose={handleClose}
              />
            ) : (
              <Empty
                style={{ paddingTop: '20vh' }}
                description="You dont have any queries opened right now. "
              />
            )}
          </CardChatWindowStyled>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

OpenQueryComponent.propTypes = {};

export default OpenQueryComponent;
