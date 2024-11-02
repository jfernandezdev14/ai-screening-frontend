import {  createContext, useContext, useState } from 'react'
import { Splitter, Layout, Space } from 'antd'
import { CandidateScores } from '../CandidateScores'
import { UploadCandidate } from '../UploadCandidate'
import { SearchCandidate } from '../SearchCandidate'


export function AIScreening(): JSX.Element {

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

                        <UploadCandidate/>
                    </Space>
                </Splitter.Panel>
                <Splitter.Panel>
                    <CandidateScores

                     />
                </Splitter.Panel>
            </Splitter>
        </Layout>
    )
}

export default AIScreening
