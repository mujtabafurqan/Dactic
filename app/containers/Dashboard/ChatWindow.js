import React, { useEffect, useContext, useState, useRef } from 'react';
import { Input, Col, Button, Row, Card, Form, List } from 'antd';
import PropTypes from 'prop-types';
import request from 'utils/request';
import InfiniteScroll from 'react-infinite-scroller';
import { GiCyborgFace, GiBandit } from 'react-icons/gi';
import { FaRobot } from 'react-icons/fa';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';
import RichTextInput from './RichTextInput';

import DashboardContext from './dashboardContext';
import GlobalContext from '../App/globalContext';
import { formatStringTime } from '../../utils/DateTimeFormatter';

const { TextArea } = Input;

const styles = {
  card: {
    height: '100%',
    width: '100%',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   justifyContent: 'space-between',
  },
  cardBody: {
    maxHeight: '100%',
    overflow: 'auto',
    padding: '0',
  },
  card2: {
    width: '100%',
    padding: '0',
    bottom: '0px',
    position: 'fixed',
  },
  card2Body: {
    width: '100%',
    paddingTop: '5px',
    paddingBottom: '0',
  },
  chatGrey: {
    width: '100%',
    backgroundColor: 'grey',
  },
  chatWhite: {
    width: '100%',
    backgroundColor: 'white',
  },
  sendButton: {
    paddingLeft: '1rem',
  },
};

const RowRichTextWithButtonStyled = styled(Row)`
  height: ${props => (props.isHistory ? '0vh' : '30vh')};
  width: 100%;
  position: absolute;
  padding: 10px;
  bottom: 0px;
`;

const RowCompleteChatScollStyled = styled(Row)`
  height: ${props => (props.isHistory ? '90vh' : '60vh')};
  position: relative;
  overflow: auto;
`;

const BotTitleStyled = styled.p`
  font-weight: bold;
  font-size: large;
`;

const BotSourceStyled = styled.p`
  font-weight: 400;
  font-style: italic;
`;

const UnorderedListStyled = styled.ul`
  list-style-type: disc;
`;

export function ChatWindow(props) {
  const globalContext = useContext(GlobalContext);
  const context = useContext(DashboardContext);
  const [form] = Form.useForm();
  const [messagesOnScreen, setMessagesOnScreen] = useState([]);
  // the rich tetx input will be saved here. It is an object
  const [richTextChatMessage, setRichTextChatMessage] = useState('');

  useEffect(() => {
    form.resetFields();
    async function fetchMessagesForChat(chatId) {
      const chat = await request(`/v1/dashboard/getChat?chatId=${chatId}`);
      // console.log('lenght', chat.messages.length);
      // only show the automated replies if the query just started or if its not
      // closed query
      if (chat.messages.length === 1 && !props.isHistory) {
        const messagesWithBotReply = chat.messages;

        messagesWithBotReply.push({
          isBot: true,
          botName: 'BOT',
          content: [
            {
              botTitle: 'How Does Bitcoin Mining Work?',
              description:
                'Cryptocurrency mining is painstaking, costly, and only sporadically rewarding. Nonetheless, mining has a magnetic appeal for many investors interested in cryptocurrency because of the fact that miners are rewarded for their work with crypto tokens. This may be ...',
              source:
                'https://www.investopedia.com/tech/how-does-bitcoin-mining-work/',
            },
            {
              botTitle: 'How Does Bitcoin Mining Work?',
              description:
                'Bitcoin is a sovereign system of digital money. It has no direct correlation to any real-world currency, nor is it controlled by any government or centralized entity. But people can (and do) use it to purchase real-world items at major retailers such as Overstock.com and Expedia.',
              source:
                'https://www.thebalance.com/how-does-bitcoin-mining-work-5088328',
            },
            {
              botTitle: 'What is Bitcoin Mining?',
              description:
                'Bitcoin mining refers to the process of digitally adding transaction records to the blockchain, which is a publicly distributed ledger holding the history of every bitcoin transaction. Mining is a record-keeping process executed through immense computing power. E',
              source:
                'https://corporatefinanceinstitute.com/resources/knowledge/other/bitcoin-mining/',
            },
          ],

          readStatus: true,
          timestamp: '2021-03-10T12:59:04.457Z',
          userOrExpertId: '6033ba5ba574e699069c9906',
          userOrExpertName: 'BOT',
          _id: '6048c2981c229914d86f3b22',
        });

        setMessagesOnScreen(messagesWithBotReply);
      }

      setMessagesOnScreen(chat.messages);
      scrollToBottom();
    }

    fetchMessagesForChat(props.chatDetails.id);
  }, [props.chatDetails.id]);

  const listEndRef = useRef(null);

  const scrollToBottom = () => {
    // Scroll the chats to the most recent chat
    listEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {}, []);

  const chatSendButton = chatInput => {
    // convert the RichText object format to RAW JSON
    const chatRichTextInJSON = JSON.stringify(
      convertToRaw(richTextChatMessage),
    );
    // console.log(
    //   'malik message sent ',
    //   chatRichTextInJSON, // message input
    //   props.chatDetails.id, // chat id
    //   props.userId,
    //   props.role,
    // );
    const message = {
      content: chatRichTextInJSON,
      read: false,
      timestamp: Date.now(),
      role: globalContext.user.role,
      userOrExpertName: globalContext.user.name,
    };

    // add new message on the previours state array
    setMessagesOnScreen([...messagesOnScreen, message]);
    // send message to backend
    context.sendMessage(props.chatDetails.id, message);
    // reset the input bar
    form.resetFields();
    scrollToBottom();
  };

  return (
    <React.Fragment>
      {/* ------------------CHATS-------------- */}
      <RowCompleteChatScollStyled isHistory={props.isHistory}>
        <InfiniteScroll
          pageStart={messagesOnScreen.length - 1}
          isReverse
          style={{
            width: '100%',
            // height: '100%',
          }}
        >
          <List
            style={{ width: '100%' }}
            itemLayout="vertical"
            size="large"
            dataSource={messagesOnScreen}
            renderItem={item => (
              <List.Item key={item.id}>
                {item.isBot ? (
                  <React.Fragment>
                    <List.Item.Meta
                      avatar={<FaRobot size="1.5rem" color="#5222d0" />}
                      title={
                        <div>
                          <label>{item.botName}</label>
                          <span
                            style={{
                              paddingLeft: '2rem',
                              fontSize: '10px',
                              color: 'grey',
                            }}
                          >
                            {/* {formatStringTime(Date.now(), 12)} */}
                          </span>
                        </div>
                      }
                      style={{ margin: '0' }}
                    />
                    <div>
                      <UnorderedListStyled>
                        {item.content.map(item2 => (
                          <li>
                            <Row>
                              <div>
                                <BotTitleStyled>
                                  {item2.botTitle}
                                </BotTitleStyled>
                                <p>{item2.description}</p>
                                <BotSourceStyled>
                                  Source: {item2.source}
                                </BotSourceStyled>
                              </div>
                            </Row>
                            <Row
                              style={{
                                display: 'flex',
                                color: '#ffffff',
                                justifyContent: 'flex-start',
                              }}
                              gutter={16}
                            >
                              <Col>
                                <Button
                                  type="primary"
                                  // htmlType="submit"
                                  className="solvedButton grow"
                                  shape="round"
                                  onClick={() =>
                                    props.handleClose(props.chatDetails.id)
                                  }
                                >
                                  Yes, this solved my question
                                </Button>
                              </Col>

                              <Col style={{ textAlign: 'left' }}>
                                <Button
                                  type="primary"
                                  // htmlType="submit"
                                  className="viewResultButton grow"
                                  shape="round"
                                >
                                  <a
                                    href={item2.source}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    View result
                                  </a>
                                </Button>
                              </Col>
                            </Row>
                            <br />
                          </li>
                        ))}
                      </UnorderedListStyled>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <List.Item.Meta
                      avatar={
                        item.role === 'expert' ? (
                          <GiCyborgFace size="1.5rem" />
                        ) : (
                          <GiBandit size="1.5rem" />
                        )
                      }
                      title={
                        <div>
                          <label>{item.userOrExpertName}</label>
                          <span
                            style={{
                              paddingLeft: '2rem',
                              fontSize: '10px',
                              color: 'grey',
                            }}
                          >
                            {formatStringTime(item.timestamp, 12)}
                          </span>
                        </div>
                      }
                      style={{ margin: '0' }}
                    />
                    {
                      <div
                        dangerouslySetInnerHTML={{
                          __html: draftToHtml(JSON.parse(item.content)),
                        }}
                      />
                    }
                  </React.Fragment>
                )}
              </List.Item>
            )}
          />
          <div ref={listEndRef} />
        </InfiniteScroll>
      </RowCompleteChatScollStyled>
      {/* --------------RICH TEXT INPUT AND BUTTON----------- */}
      <RowRichTextWithButtonStyled isHistory={props.isHistory}>
        {!props.isHistory && (
          <Form form={form} onFinish={chatSendButton} style={{ width: '100%' }}>
            <Row style={{ width: '100%' }}>
              <Col span={18}>
                <Form.Item name={['content']}>
                  <RichTextInput setRichTextInParent={setRichTextChatMessage} />
                </Form.Item>
              </Col>
              <Form.Item>
                <Col span={4} style={styles.sendButton}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="submitButton grow"
                    shape="round"
                  >
                    Send
                  </Button>
                </Col>
              </Form.Item>
            </Row>
          </Form>
        )}
      </RowRichTextWithButtonStyled>
    </React.Fragment>
  );
}

ChatWindow.propTypes = {
  chatDetails: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  isHistory: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

export default ChatWindow;
