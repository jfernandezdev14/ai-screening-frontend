import React from 'react'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Select, Space, Upload } from 'antd'
import { API_URL } from '../../../constants'

const contentStyle: React.CSSProperties = {
    margin: 0,
    minHeight: '100%',
    height: '100%',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
}

const { Option } = Select

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

const uploadCandidates = async (values: any) => {
    const api_endpoint_url = API_URL + '/api/v1/candidates'
    const requestBody = {
        selection_criteria: values.selection_criteria,
        model: values.model,
    }
    const response = await fetch(api_endpoint_url, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data
}

const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
        return e
    }
    return e?.fileList
}

const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    uploadCandidates(values)
}

export function UploadCandidate() {
    return (
        <Flex justify="center" align="center" vertical>
            <Card
                title="Search by PDF Document"
                bordered={false}
                style={{ width: 400, padding: 24 }}
            >
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
                        name="model"
                        label="Please select the model that will score the candidates:"
                        rules={[
                            {
                                required: true,
                                message: 'Select the model',
                            },
                        ]}
                    >
                        <Select placeholder="Select the models">
                            <Option value="nearest_neighbors">
                                Model 1 | Nearest Neighbors
                            </Option>
                            <Option value="random_forest">
                                Model 2 | Random Forest
                            </Option>
                            <Option value="neural_network">
                                Model 3 | Neural Network
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="upload_candidate"
                        label="Upload a job description:"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        extra="Upload the resume of the candidates to evaluate"
                    >
                        <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>
                                Click to upload
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item label="">
                        <Form.Item
                            name="dragger"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            noStyle
                        >
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                </p>
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
            </Card>
        </Flex>
    )
}

export default UploadCandidate
