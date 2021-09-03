/**
 *
 * ProfileComponent
 *
 */

import React, { useEffect, useState } from 'react';
import { Descriptions, Card } from 'antd';
// import PropTypes from 'prop-types';
import request from 'utils/request';
// import styled from 'styled-components';

function ProfileComponent() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const userFromBackend = await request(`/v1/dashboard/getUserDetails`);
    setUser(userFromBackend);
  };
  return (
    <React.Fragment>
      <Card bordered={false} style={{ height: '100%' }}>
        <Descriptions title="Profile" layout="vertical" bordered>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Disciplines">
            {user.disciplines &&
              user.disciplines.map(discipline => (
                <div>
                  {discipline} <br />
                </div>
              ))}
          </Descriptions.Item>
          <Descriptions.Item label="Sub-Discipline">
            {user.subDisciplines &&
              user.subDisciplines.map(subDiscipline => (
                <div>
                  {subDiscipline} <br />
                </div>
              ))}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </React.Fragment>
  );
}

ProfileComponent.propTypes = {};

export default ProfileComponent;
