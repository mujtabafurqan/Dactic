import React, { useEffect, useContext, useState } from 'react';
import { Layout, Menu, Typography, Empty } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import DashboardContext from './dashboardContext';
import UserInputQuery from './UserInputQuery';

const { Sider, Header, Content, Footer } = Layout;
const { Text } = Typography;

export function DisciplinesListComponent(props) {
  const context = useContext(DashboardContext);
  const [subDisciplineList, setSubDisciplineList] = useState([]);
  const [subDisciplineOpen, setSubDisciplineOpen] = useState(false);
  useEffect(() => {
    // // Pass in a callback function!
  }, []);

  const disHandleClick = item => {
    // console.log(DisciplinesTestObject[item.key]);
    console.log(item);
    // different discipline selected
    if (subDisciplineList !== context.disciplinesList[item.key]) {
      setSubDisciplineList(context.disciplinesList[item.key]);
      props.setDisciplineSelected(item.key);
      props.setSubDisciplineSelected('');
      setSubDisciplineOpen(false);
    }
    // same discipline selected
    else {
      console.log('same discipline');
    }

    setSubDisciplineOpen(true);
  };

  const SubDisHandleClick = item => {
    console.log(item, 'checking sub discipline ');
    // store the subdiscipline selected in dashboard state
    props.setSubDisciplineSelected(subDisciplineList[item.key]);
    // console.log(item);
  };
  return (
    <React.Fragment>
      <Layout className="whiteBackgroundLayout">
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            background: 'white',
          }}
        >
          <div className="logo" />
          <Header style={{ backgroundColor: '#5C40A7' }}>
            <Text level={5} style={{ color: 'white' }}>
              Disciplines
            </Text>
          </Header>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['0']}
            onClick={disHandleClick}
          >
            {Object.keys(context.disciplinesList).map(k => (
              <Menu.Item key={k}>{k}</Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className="whiteBackgroundLayout">
          {subDisciplineOpen ? (
            <React.Fragment>
              <Sider
                style={{
                  overflow: 'auto',
                  height: '100vh',
                  background: 'white',
                }}
              >
                <div className="logo" />
                <Header style={{ backgroundColor: '#5C40A7' }}>
                  <Text level={5} style={{ color: 'white' }}>
                    Sub Disciplines
                  </Text>
                </Header>
                <Menu
                  theme="light"
                  mode="inline"
                  // defaultSelectedKeys={['0']}
                  onClick={SubDisHandleClick}
                >
                  {subDisciplineList.map((item, i) => (
                    <Menu.Item key={i}>{item}</Menu.Item>
                  ))}
                </Menu>
              </Sider>

              <Layout className="site-layout">
                <Header style={{ backgroundColor: '#5C40A7' }}>
                  <Text level={5} style={{ color: 'white', textAlign: 'left' }}>
                    Enter Query
                  </Text>
                </Header>

                <Content
                  className="site-layout-background"
                  style={{
                    minHeight: 280,
                  }}
                >
                  {props.disciplineSelected !== '' &&
                  props.subDisciplineSelected !== '' ? (
                      <UserInputQuery
                        disciplineSelected={props.disciplineSelected}
                        subDisciplineSelected={props.subDisciplineSelected}
                        submitQuery={() => {
                        props.submitQuery();
                      }}
                      />
                  ) : (
                      <Empty
                      style={{ paddingTop: '20vh' }}
                      description="Please select the Subdiscipline to create a new query."
                    />
                    )}
                </Content>
              </Layout>
            </React.Fragment>
          ) : (
            <Empty
              style={{ paddingTop: '20vh' }}
              description="Please select the Discipline to create a new query."
            />
          )}
        </Layout>
      </Layout>
    </React.Fragment>
  );
}

DisciplinesListComponent.propTypes = {
  setDisciplineSelected: PropTypes.func.isRequired,
  setSubDisciplineSelected: PropTypes.func.isRequired,
  subDisciplineSelected: PropTypes.string.isRequired,
  disciplineSelected: PropTypes.string.isRequired,
  submitQuery: PropTypes.func.isRequired,
  // getProfile: PropTypes.func.isRequired,
};

export default DisciplinesListComponent;
