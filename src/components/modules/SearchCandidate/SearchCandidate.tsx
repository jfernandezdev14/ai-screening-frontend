import React from 'react'
import {
    Button,
    Form,
    Input,
    Select,
    Space,
    Flex,
    Card,
} from 'antd'
import { API_URL } from '../../../constants'

const { Option } = Select

const evaluateCandidates = async (values: any) => {
    const api_endpoint_url = API_URL + '/api/v1/candidates'
    const requestBody = {
        selection_criteria: values.selection_criteria,
        model: values.model,
    }
    const response = await fetch(api_endpoint_url, {
        method: 'GET',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data
}

const onFinish = async (values: any) => {
    console.log('Received values of form: ', values)
    let response = await evaluateCandidates(values)
    console.log(response)
}

export function SearchCandidate() {
    return (
        <Flex justify="center" align="center" vertical>
            <Card
                title="Search by Role Description"
                bordered={false}
                style={{ width: 400, padding: 24 }}
            >
                <Form
                    name="validate_other"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{ maxWidth: 400 }}
                >
                    <Form.Item
                        label="Introduce the candidate selection criteria:"
                        name="selection_criteria"
                        rules={[
                            {
                                required: true,
                                message:
                                    'Please enter your selection criteria.',
                            },
                        ]}
                    >
                        <Input.TextArea maxLength={200} autoSize />
                    </Form.Item>

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

export default SearchCandidate
