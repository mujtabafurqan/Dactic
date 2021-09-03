/**
 *
 * MenuCard
 *
 */

import React from 'react';
import { Card, Row, Col, Tag, Space, Badge, Tooltip } from 'antd';
import { CheckSquareOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { formatStringTime } from '../../utils/DateTimeFormatter';
// import styled from 'styled-components';

function MenuCard(props) {
  return (
    <Card style={{ width: 400 }} onClick={() => props.onClick(props.query.id)}>
      <Row>
        <Col span={2}>
          {props.role === 'user' ? (
            <Tooltip title="Close this query">
              <CheckSquareOutlined
                onClick={() => props.closeChat(props.query.id)}
              />
            </Tooltip>
          ) : null}
        </Col>
        <Col span={18}>
          <Space direction="vertical">
            <Row style={{ fontWeight: '600' }}>{props.query.title}</Row>
            {props.role === 'user'
              ? [
                props.query.expertName ? (
                    <Row style={{ fontStyle: 'italic', fontWeight: '300' }}>{`${
                    props.query.expertName
                  } is your expert`}</Row>
                ) : (
                  <Row style={{ fontStyle: 'italic', fontWeight: '300' }}>
                      Awaiting Expert assignment
                  </Row>
                  ),
              ]
              : null}
            <Row>
              <Tag style={{ fontStyle: 'italic', fontWeight: '400' }}>
                {props.query.discipline}
              </Tag>

              <Tag style={{ fontStyle: 'italic', fontWeight: '400' }}>
                {props.query.subDiscipline}
              </Tag>
            </Row>
          </Space>
        </Col>

        <Col span={4}>
          <Row>{formatStringTime(props.query.startedTimestamp, 24)}</Row>
          <Row style={{ paddingTop: '1rem' }}>
            <Badge count={props.unreadCount} />
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

MenuCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  unreadCount: PropTypes.number.isRequired,
  role: PropTypes.string.isRequired,
  closeChat: PropTypes.func.isRequired,
};

export default MenuCard;
