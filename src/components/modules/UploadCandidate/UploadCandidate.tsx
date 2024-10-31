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
    const api_endpoint_url = API_URL + '/'
    const requestBody = {
        selection_criteria: values.selection_criteria,
        model: values.model,
    }
    const response = await fetch('/api/users', {
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
}

export function UploadCandidate() {
    return (
        <Flex justify="center" align="center" vertical>
            <Card
                title="Upload Job Description "
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

                    <Form.Item label="Dragger">
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
