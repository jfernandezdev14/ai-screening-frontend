import React from "react";
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Upload,
} from 'antd';

const contentStyle: React.CSSProperties = {
  margin: 0,
  minHeight: "100%",
  height: "100%",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const normFile = (e: any) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onFinish = (values: any) => {
  console.log('Received values of form: ', values);
};

export function UploadCandidate() {
  return (
    <Form
    name="validate_other"
    layout="vertical"
    onFinish={onFinish}
    initialValues={{
      'input-number': 3,
      'checkbox-group': ['A', 'B'],
      rate: 3.5,
      'color-picker': null,
    }}
    style={{ maxWidth: 600 }}
  >

    <Form.Item
    label="Introduce the candidate selection criteria:"
    name="TextArea"
    rules={[{ required: true, message: 'Please enter your selection criteria.' }]}
    >
      <Input.TextArea />
    </Form.Item>


    <Form.Item
      name="select-multiple"
      label="Please select the models that will score the candidate:"
      rules={[{ required: true, message: 'Select the models', type: 'array' }]}
    >
      <Select mode="multiple" placeholder="Select the models">
        <Option value="nearest_neighbors">Model 1 | Nearest Neighbors</Option>
        <Option value="random_forest">Model 2 | Random Forest</Option>
        <Option value="neural_network">Model 3 | Neural Network</Option>
      </Select>
    </Form.Item>

    <Form.Item
      name="upload"
      label="Upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      extra="Upload the resume of the candidates to evaluate"
    >
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    </Form.Item>

    <Form.Item label="Dragger">
      <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
        <Upload.Dragger name="files" action="/upload.do">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </Form.Item>
    </Form.Item>

    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
      <Space>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="reset">reset</Button>
      </Space>
    </Form.Item>
  </Form>
  );
}

export default UploadCandidate;
