/**
 *
 * ChatExpandedView
 *
 */

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Input, Statistic, Form } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LeftCircleOutlined } from '@ant-design/icons';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import RichTextInput from '../../containers/Dashboard/RichTextInput';

import {
  formatStringTime,
  timeDiffInHours,
} from '../../utils/DateTimeFormatter';
// import styled from 'styled-components';
const { TextArea } = Input;

const RowRichTextWithButtonStyled = styled(Row)`
  width: 100%;
  padding: 10px;
  bottom: 0px;
  &&& {
    height: 100%;
    flex-direction: column;
  }
`;

function ChatExpandedView(props) {
  const [accepted, setAccepted] = useState(false);
  // const [answer, setAnswer] = useState('');
  const [form] = Form.useForm();
  const [richTextChatMessage, setRichTextChatMessage] = useState('');

  useEffect(() => {
    setAccepted(props.accepted);
  }, []);

  const acceptQuery = () => {
    setAccepted(true);
  };

  const handleSubmit = () => {
    // convert the RichText object format to RAW JSON
    const chatRichTextInJSON = JSON.stringify(
      convertToRaw(richTextChatMessage),
    );

    props.submitAnswer(props.chatId, chatRichTextInJSON);
  };

  return (
    <Card
      style={{ width: '100%', height: '100vh', padding: '0' }}
      bodyStyle={{ height: '100%', padding: '0' }}
      bordered={false}
    >
      <Row style={{ height: '100%' }}>
        <Col span={12}>
          <Card
            title={
              <Row>
                <Col span={2}>
                  <LeftCircleOutlined
                    onClick={() => {
                      props.setExpandedView(false);
                    }}
                  />
                </Col>
                <Col span={11}>
                  <Statistic
                    title="Time"
                    value={formatStringTime(props.startTime, 12)}
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={11}>
                  <Statistic
                    title="Time to Answer"
                    value={timeDiffInHours(props.startTime)}
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
              </Row>
            }
            style={{ height: '100%' }}
          >
            <h2>{props.title}</h2>

            {/* ------WAY TO DISPLAY RICH TEXTT---------- */}
            {
              <p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: draftToHtml(JSON.parse(props.description)),
                  }}
                />
              </p>
            }
          </Card>
        </Col>
        {accepted ? (
          <Col span={12}>
            <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
              {/* --------------RICH TEXT ---------------- */}

              <RowRichTextWithButtonStyled type="flex" wrap={false}>
                {/* <Form
                  form={form}
                  onFinish={handleSubmit}
                  style={{ width: '100%' }}
                > */}
                {/* <Form.Item name={['content']}> */}
                <Row style={{ height: '90%' }}>
                  <RichTextInput setRichTextInParent={setRichTextChatMessage} />
                </Row>
                {/* </Form.Item> */}
                {/* <Form.Item> */}
                <Row
                  type="flex"
                  justify="center"
                  style={{ alignItems: 'center', marginTop: '2rem' }}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  <Button type="dashed" shape="round">
                    Submit
                  </Button>
                </Row>
                {/* </Form.Item> */}
                {/* </Form> */}
              </RowRichTextWithButtonStyled>
              {/* <TextArea
                placeholder="Enter You Answer"
                rows={30}
                onChange={evt => {
                  setAnswer(evt.target.value);
                }}
              /> */}
              {/* <Row
                type="flex"
                justify="center"
                style={{ alignItems: 'center', marginTop: '2rem' }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Button type="dashed" shape="round">
                  Submit
                </Button>
              </Row> */}
            </Card>
          </Col>
        ) : (
          <Col span={12}>
            <Card style={{ height: '100%' }} bodyStyle={{ height: '100%' }}>
              <Row
                type="flex"
                justify="center"
                style={{ height: '50%', alignItems: 'center' }}
                onClick={() => {
                  acceptQuery();
                }}
              >
                <Button type="dashed" shape="round">
                  Accept
                </Button>
              </Row>
              <Row
                type="flex"
                justify="center"
                style={{ height: '50%', alignItems: 'center' }}
                onClick={() => {
                  props.declineQuery(props.chatId);
                }}
              >
                <Button type="dashed" shape="round">
                  Decline
                </Button>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </Card>
  );
}

ChatExpandedView.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  declineQuery: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  accepted: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
  setExpandedView: PropTypes.func.isRequired,
};

export default ChatExpandedView;
