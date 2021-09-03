import React, { useEffect, useContext, useState } from 'react';
import { Form, Input, Button, Card, Tag } from 'antd';
import PropTypes from 'prop-types';
import { convertToRaw } from 'draft-js';
import DashboardContext from './dashboardContext';
import RichTextInput from './RichTextInput';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const validateMessages = {
  required: '${name} is required!',
  types: {
    email: '${name} is not a valid email!',
    number: '${name} is not a valid number!',
  },
  number: {
    range: '${name} must be between ${min} and ${max}',
  },
};
export function UserInputQuery(props) {
  useEffect(() => {
    // // Pass in a callback function!
  }, []);

  const context = useContext(DashboardContext);
  const [form] = Form.useForm();
  const [richText, setRichText] = useState('');
  const getDescriptionFromRichText = () => richText;

  const onSubmit = values => {
    const description = getDescriptionFromRichText();
    // convert the rich text object to Raw Json format so that we can store in DB.
    const descriptionInJSON = JSON.stringify(convertToRaw(description));
    // const htmlParsed = convertToHTML(description);
    // console.log(
    //   'JSON TEST',
    //   htmlParsed,
    //   descriptionInJSON,
    //   convertToRaw(description),
    // );

    const queryObject = {
      description: descriptionInJSON,
      linksReferred: values.query.links,
      title: values.query.title,
      discipline: props.disciplineSelected,
      subDiscipline: props.subDisciplineSelected,
    };
    context.submitUserQuery(queryObject).then(() => {
      console.log('SUBMITTING QUERY');
      // submit only after it is done hitting the server
      props.submitQuery();
    });
    form.resetFields();
    // props.submitQuery();
  };

  return (
    <React.Fragment>
      <Card
        style={{ padding: '0' }}
        bordered={false}
        bodyStyle={{ paddingTop: '11px' }}
      >
        <Tag style={{ fontWeight: '600' }}>{props.disciplineSelected}</Tag>
        <Tag style={{ fontWeight: '600' }}>{props.subDisciplineSelected}</Tag>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onSubmit}
          validateMessages={validateMessages}
          style={{ marginTop: '17px' }}
        >
          {/* query.title */}
          <Form.Item
            name={['query', 'title']}
            rules={[{ required: true, type: 'string' }]}
          >
            <Input
              placeholder="Title"
              bordered={false}
              style={{ borderBottom: '1px solid #d9d9d9' }}
            />
          </Form.Item>
          {/* query.links */}
          <Form.Item
            name={['query', 'links']}
            rules={[{ required: true, type: 'string' }]}
          >
            <Input.TextArea
              placeholder="Links"
              bordered={false}
              style={{ borderBottom: '1px solid #d9d9d9' }}
            />
          </Form.Item>
          {/* query.links */}

          {/* ---------RICH TEXT EDITOR----- */}
          <Form.Item name={['query', 'richtext']} rules={[{ required: false }]}>
            <RichTextInput setRichTextInParent={setRichText} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              className="submitButton grow"
              shape="round"
            >
              {'  '}
              Send{'  '}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
}

UserInputQuery.propTypes = {
  disciplineSelected: PropTypes.string.isRequired,
  subDisciplineSelected: PropTypes.string.isRequired,
  submitQuery: PropTypes.func.isRequired,
};

export default UserInputQuery;
