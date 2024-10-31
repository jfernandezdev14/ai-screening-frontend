import React from 'react'
import { Splitter, Layout, Space } from 'antd'
import { CandidateScores } from '../CandidateScores'
import { API_URL } from '../../../constants'
import { UploadCandidate } from '../UploadCandidate'
import { SearchCandidate } from '../SearchCandidate'

const evaluateCandidates = async (values: any) => {
    const api_endpoint_url = API_URL + '/'
    const requestBody = {
        selection_criteria: values.selection_criteria,
        model: values.model,
    }
    const response = await fetch('/api/users', {
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

export function AIScreening() {
    return (
        <Layout style={{ minHeight: '100%', height: '100%' }}>
            <Splitter
                layout="horizontal"
                style={{
                    height: 'calc(100%)',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Splitter.Panel min="20%" defaultSize="20%" resizable={false}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{ display: 'flex' }}
                    >
                        <SearchCandidate />

                        <UploadCandidate />
                    </Space>
                </Splitter.Panel>
                <Splitter.Panel>
                    <CandidateScores />
                </Splitter.Panel>
            </Splitter>
        </Layout>
    )
}

export default AIScreening
