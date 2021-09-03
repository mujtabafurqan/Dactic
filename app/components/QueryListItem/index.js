/**
 *
 * QueryListItem
 *
 */

import React, { useEffect } from 'react';
import { Card, Tag, Button, Table, Column, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  formatStringTime,
  timeDiffInHours,
} from '../../utils/DateTimeFormatter';

// import styled from 'styled-components';

function QueryListItem(props) {
  useEffect(() => {}, []);

  return (
    <Card className="itemListContainer" bodyStyle={{ padding: '0' }}>
      <Table
        dataSource={props.queryList}
        onRow={(record, rowIndex) => ({
          onClick: event => {
            props.selectChat(record.id);
          },
        })}
      >
        <Column
          title="Discipline"
          dataIndex="discipline"
          key="discipline"
          render={text => <Tag>{text.toUpperCase()}</Tag>}
        />
        <Column
          title="Sub-Discipline"
          dataIndex="subDiscipline"
          key="subDiscipline"
          render={text => <Tag>{text.toUpperCase()}</Tag>}
        />
        <Column title="Title" dataIndex="title" key="title" />
        <Column
          title="Time"
          dataIndex="startedTimestamp"
          key="startedTimestamp"
          render={text => formatStringTime(text, 12)}
        />
        <Column
          title="Time To Answer"
          dataIndex="startedTimestamp"
          key="startedTimestamp"
          render={text => timeDiffInHours(text)}
        />
        <Column
          title="Action"
          key="action"
          render={chat => (
            <Space size="middle">
              <Button
                type="dashed"
                shape="round"
                onClick={e => {
                  e.stopPropagation();
                  props.acceptQuery(chat.id);
                }}
              >
                Accept
              </Button>
              <Button
                type="dashed"
                shape="round"
                onClick={e => {
                  e.stopPropagation();
                  props.declineQuery(chat.id);
                }}
              >
                Decline
              </Button>
            </Space>
          )}
        />
      </Table>
    </Card>
  );
}

QueryListItem.propTypes = {
  queryList: PropTypes.object.isRequired,
  acceptQuery: PropTypes.func.isRequired,
  declineQuery: PropTypes.func.isRequired,
  selectChat: PropTypes.func.isRequired,
};

export default QueryListItem;
