import React, { useEffect, useContext, useState } from 'react';
import { Layout, Row, Col, Typography, Space, message } from 'antd';
import request from 'utils/request';
import { LeftCircleOutlined } from '@ant-design/icons';
import DashboardContext from './dashboardContext';
import ChatExpandedView from '../../components/ChatExpandedView';
import QueryListItem from '../../components/QueryListItem';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export function ExpertNewQueryComponent() {
  const context = useContext(DashboardContext);
  const [expandedView, setExpandedView] = useState(false);
  const [selectedChat, setSelectedChat] = useState({});
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    context.getUnacceptedQueries();
  }, []);

  const selectChat = chatId => {
    context.unacceptedQueriesList.forEach(cht => {
      if (chatId === cht.id) {
        setSelectedChat(cht);
        setExpandedView(true);
      }
    });
  };

  const declineQuery = chatId => {
    const body = {
      accepted: false,
    };
    context.unacceptedQueriesList.forEach(async cht => {
      if (chatId === cht.id) {
        await request(`/v1/dashboard/acceptOrDeclineChat/${cht.id}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': `application/json; charset=UTF-8`,
            Accept: 'text/plain',
          },
        });
        context.getUnacceptedQueries();
        setExpandedView(false);
        message.success('Declined');
      }
    });
  };

  const acceptQuery = chatId => {
    setAccepted(true);
    selectChat(chatId);
    message.success('Please give your first reply');
  };

  const submitAnswer = async (chatId, content) => {
    const submitAnswerBody = {
      message: {
        content,
        readStatus: false,
      },
    };
    await context.unacceptedQueriesList.forEach(async cht => {
      if (chatId === cht.id) {
        await request(`/v1/dashboard/newMessage/${cht.id}`, {
          method: 'PUT',
          body: JSON.stringify(submitAnswerBody),
          headers: {
            'Content-Type': `application/json; charset=UTF-8`,
            Accept: 'text/plain',
          },
        });
      }
    });
    const acceptQueryBody = {
      accepted: true,
    };
    await context.unacceptedQueriesList.forEach(async cht => {
      if (chatId === cht.id) {
        await request(`/v1/dashboard/acceptOrDeclineChat/${cht.id}`, {
          method: 'PUT',
          body: JSON.stringify(acceptQueryBody),
          headers: {
            'Content-Type': `application/json; charset=UTF-8`,
            Accept: 'text/plain',
          },
        });
      }
    });
    context.getUnacceptedQueries();
    setExpandedView(false);
    message.success('Submitted');
  };

  return (
    <React.Fragment>
      <Layout className="site-layout">
        {/* <Header style={{ backgroundColor: '#5C40A7' }}>
          {expandedView ? (
            <Row>
              <Space>
                <LeftCircleOutlined
                  style={{ color: 'white', height: '100%', width: '100%' }}
                  onClick={() => {
                    setExpandedView(false);
                  }}
                />
                <Text level={5} style={{ color: 'white', textAlign: 'left' }}>
                  Query Details
                </Text>
              </Space>
            </Row>
          ) : (
            <Text level={5} style={{ color: 'white', textAlign: 'left' }}>
              List of all open Queries
            </Text>
          )}
        </Header> */}

        <Content
          className="site-layout-background"
          style={{
            minHeight: '100vh',
          }}
        >
          {expandedView ? (
            <ChatExpandedView
              chatId={selectedChat.id}
              title={selectedChat.title}
              description={selectedChat.description}
              accepted={accepted}
              startTime={selectedChat.startedTimestamp}
              declineQuery={declineQuery}
              submitAnswer={submitAnswer}
              setExpandedView={setExpandedView}
            />
          ) : (
            <div>
              <QueryListItem
                queryList={context.unacceptedQueriesList}
                selectChat={selectChat}
                acceptQuery={acceptQuery}
                declineQuery={declineQuery}
              />
              {/* ))} */}
            </div>
          )}
        </Content>
      </Layout>
    </React.Fragment>
  );
}

ExpertNewQueryComponent.propTypes = {};

export default ExpertNewQueryComponent;
