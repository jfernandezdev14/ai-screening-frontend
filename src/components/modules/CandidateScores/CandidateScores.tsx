import React from 'react'
import { Table, Tag, Space, Layout } from 'antd'
import type { TableProps } from 'antd'

interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Candidate',
        dataIndex: 'candidate',
        key: 'candidate',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
    },
    {
        title: 'Experience',
        dataIndex: 'experience',
        key: 'experience',
    },
    {
        title: 'Scores',
        key: 'scores',
        dataIndex: 'scores',
        
    }
]

const data: DataType[] = []

export function CandidateScores() {
    return (
        <Layout style={{ minHeight: '100%', height: '100%' }}>
            <Table<DataType> columns={columns} dataSource={data} bordered />
        </Layout>
)
}

export default CandidateScores
