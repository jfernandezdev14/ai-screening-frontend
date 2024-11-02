import { Table, Tag, Space, Layout } from 'antd'
import type { TableProps } from 'antd'
import { useDataContext } from '../../MainLayout/MainLayout'

export interface PredictionCandidate {
    candidate_profile: string
    disqualified: number
    educations: string
    experiences: string
    headline: string
    job_title: string
    keywords: string
    name: string
    normalized_prediction_score: number
    prediction: number
    similarity_score: number
    skills: string
    summary: string
}

const columns: TableProps<PredictionCandidate>['columns'] = [
    {
        title: 'Candidate',
        dataIndex: 'name',
        key: 'candidate',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Headline',
        dataIndex: 'headline',
        key: 'headline',
    },
    {
        title: 'Summary',
        dataIndex: 'summary',
        key: 'summary',
    },
    {
        title: 'Keywords',
        dataIndex: 'keywords',
        key: 'keywords',
    },
    {
        title: 'Skills',
        dataIndex: 'skills',
        key: 'skills',
    },
    {
        title: 'Experiences',
        dataIndex: 'experiences',
        key: 'experiences',
    },
    {
        title: 'Educations',
        dataIndex: 'educations',
        key: 'educations',
    },
    {
        title: 'Qualification Score Percentage',
        key: 'normalized_prediction_score',
        dataIndex: 'normalized_prediction_score',
    },
]

export function CandidateScores() {
    const { data } = useDataContext()

    return (
        <Layout style={{ minHeight: '100%', height: '100%' }}>
            <Table<PredictionCandidate>
                columns={columns}
                dataSource={data}
                bordered
                pagination={{}}
                scroll={{ y: 1000 }}
                size="small"
            />
        </Layout>
    )
}

export default CandidateScores
