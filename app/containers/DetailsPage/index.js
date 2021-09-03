/**
 *
 * ExpertDetailsPage
 *
 */

import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Select, Space, Row, Col, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import request from 'utils/request';
import { Redirect } from 'react-router-dom';
import GlobalContext from '../App/globalContext';

export function DetailsPage() {
  const globalContext = useContext(GlobalContext);
  const [disciplinesList, setDisciplineList] = useState({});
  const [subDiscipline, setSubDiscipline] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    async function fetchDisciplines() {
      const discs = await request('/v1/dashboard/getDisciplines');
      setDisciplineList(discs);
    }

    fetchDisciplines();
  }, []);

  const onSubmit = async values => {
    console.log('details', values);
    await request('/v1/dashboard/addDetails', {
      method: 'PUT',
      body: JSON.stringify(values.details),
      headers: {
        'Content-Type': `application/json; charset=UTF-8`,
        Accept: 'application/json',
      },
    });
    setRedirect(true);
  };

  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 8 },
  };

  const expItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onValuesChange = ({ details }) => {
    if (details && details.disciplines) {
      const { disciplines } = details;
      setSubDiscipline([]);
      disciplines.map(dis =>
        setSubDiscipline(subDiscipline.concat(disciplinesList[dis])),
      );
    }
  };

  return (
    <React.Fragment>
      {redirect ? <Redirect to="/dashboard" /> : null}
      <div />
      <Card title="Enter Details">
        {/* <Title level={2}>Expert Details</Title> */}
        <Form
          {...layout}
          name="expert-details"
          onFinish={onSubmit}
          validateMessages={validateMessages}
          onValuesChange={onValuesChange}
        >
          {/* details.country */}
          <Form.Item
            name={['details', 'country']}
            label="Country"
            rules={[{ required: true, type: 'string' }]}
          >
            <Input />
          </Form.Item>

          {/* details.contactNo */}
          <Form.Item
            name={['details', 'contactNo']}
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input />
          </Form.Item>
          {/* details.occupation */}
          <Form.Item
            name={['details', 'occupation']}
            label="Current Occupation"
            rules={[{ required: true, type: 'string' }]}
          >
            <Input />
          </Form.Item>
          {globalContext.user.role === 'expert' && (
            <React.Fragment>
              {/* details.discipline */}
              <Form.Item
                name={['details', 'disciplines']}
                label="Discipline"
                rules={[{ required: true, type: 'array' }]}
              >
                <Select
                  mode="multiple"
                  name="Disciplines"
                  placeholder="Select the discipline you are proficient at"
                >
                  {Object.keys(disciplinesList).map(discipline => (
                    <Select.Option value={discipline}>
                      {discipline}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* details.subDiscipline */}
              <Form.Item
                name={['details', 'subDisciplines']}
                label="Sub-Discipline"
                rules={[{ required: true, type: 'array' }]}
              >
                <Select
                  mode="multiple"
                  name="Sub-Discipline"
                  placeholder="Select the sub-discipline you are proficient at"
                >
                  {subDiscipline.map(subD => (
                    <Select.Option value={subD}>{subD}</Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {/* details.skills */}
              <Form.Item name={['details', 'skills']} label="Skills">
                <Input />
              </Form.Item>

              {/* details.workHistory */}
              <Form.List name={['details', 'workHistory']}>
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(field => (
                      <Row style={{ marginLeft: '5rem' }}>
                        <Space key={field.key} align="baseline">
                          <Col>
                            <Form.Item
                              {...expItemLayout}
                              label="Company"
                              name={[field.name, 'company']}
                              fieldKey={[field.fieldKey, 'company']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing Company Name',
                                },
                              ]}
                            >
                              <Input style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...expItemLayout}
                              label="Role"
                              name={[field.name, 'role']}
                              fieldKey={[field.fieldKey, 'role']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing role Name',
                                },
                              ]}
                            >
                              <Input style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col>
                            <Form.Item
                              {...expItemLayout}
                              label="Duration"
                              name={[field.name, 'duration']}
                              fieldKey={[field.fieldKey, 'duration']}
                              rules={[
                                { required: true, message: 'Missing duration' },
                              ]}
                            >
                              <Input style={{ width: '100%' }} />
                            </Form.Item>
                          </Col>
                          <Col>
                            <MinusCircleOutlined
                              {...expItemLayout}
                              onClick={() => remove(field.name)}
                            />
                          </Col>
                        </Space>
                      </Row>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{ marginLeft: '9rem' }}
                      >
                        Add Work Experience
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </React.Fragment>
          )}
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="submitButton grow"
              shape="round"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
}

export default DetailsPage;
