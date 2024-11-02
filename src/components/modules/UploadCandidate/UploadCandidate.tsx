import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Select, Space, Upload } from 'antd'
import { LOCAL, LOCAL_API_URL, API_URL } from '../../../constants'
import { PredictionCandidate } from '../CandidateScores/CandidateScores'
import { useDataContext } from '../../MainLayout/MainLayout'

const { Option } = Select

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
}

export function UploadCandidate() {
    const { setData } = useDataContext()

    const uploadCandidates = async (values: any) => {
        var api_url = API_URL + '/api/v1/engines'
        if (LOCAL) {
            api_url = LOCAL_API_URL + '/api/v1/engines'
        }

        const api_endpoint_url = api_url + `/${values.model}/files`

        let formData = new FormData()
        if (values.upload_candidate.length > 0) {
            for (let i = 0; i < values.upload_candidate.length; i++) {
                let file = values.upload_candidate[i].originFileObj
                formData.append('files', file)
            }
        }

        if (values.dragger?.length > 0) {
            for (let i = 0; i < values.dragger.length; i++) {
                let file = values.dragger[i].originFileObj
                formData.append('files', file)
            }
        }

        const response = await fetch(api_endpoint_url, {
            method: 'POST',
            body: formData,
        })
        const data: PredictionCandidate[] = await response.json()
        setData(data)
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e)
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values)
        let response_data = await uploadCandidates(values)
        console.log(response_data)
    }

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
