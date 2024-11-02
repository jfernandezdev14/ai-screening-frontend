import React, { createContext, useContext, useState } from 'react'
import { Breadcrumb, Flex, Layout, theme, Row, Col } from 'antd'
import { SideBar } from '../SideBar'
import { MainHeader } from '../MainHeader'
import ThemeContext from '../Context/ThemeContext'
import { AIScreening } from '../modules/AIScreening'
import { PredictionCandidate } from '../modules/CandidateScores/CandidateScores'

const { Content, Footer } = Layout

const breadCrumbsItems = new Map<string, any>([
    ['1', [{ title: 'AI Screening' }]],
    ['2', [{ title: 'AI Screening' }, { title: 'Search Candidate' }]],
])

const componentsItemsView = new Map<string, any>([
    ['1', []],
    ['2', [AIScreening()]],
])

const layoutStyle = {
    borderRadius: 8,

    height: 'calc(100vh)',
    maxHeight: 'calc(100vh)',
}

const predictionList: PredictionCandidate[] = new Array() as PredictionCandidate[]

export type DataContent = {
    data: PredictionCandidate[]
    setData:(c: PredictionCandidate[]) => void
  }
export const DataContext = createContext<DataContent>({
    data: predictionList,
    setData: () => {}
  });

export const useDataContext = () => useContext(DataContext)

export function MainLayout() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken()

    const [collapsed, setCollapsed] = useState(false)
    const [current, setCurrent] = useState('2')
    const [themeC, setThemeC] = useState(colorBgContainer)
    const [data, setData] = useState(predictionList)

    return (
        <ThemeContext.Provider value={themeC}>
            <DataContext.Provider value={{data, setData}}>
            <Row>
                <Col span={24}>
                    <Layout style={layoutStyle} hasSider>
                        <Flex vertical>
                            <SideBar
                                collapsed={collapsed}
                                current={current}
                                setCurrent={setCurrent}
                            ></SideBar>
                        </Flex>
                        <Layout style={{ minHeight: '100%', height: '100%' }}>
                            <MainHeader
                                colorBgContainer={themeC}
                                collapsed={collapsed}
                                setCollapsed={setCollapsed}
                            />
                            <Content style={{ margin: '0 16px' }}>
                                <Breadcrumb
                                    style={{ margin: '16px 0' }}
                                    items={breadCrumbsItems.get(current)}
                                />
                                <Layout>
                                    <div
                                        style={{
                                            padding: 24,
                                            minHeight: '100%',
                                            height: 'calc(100%)',
                                            background: themeC,
                                            borderRadius: borderRadiusLG,
                                        }}
                                    >
                                        {componentsItemsView.get(current)}
                                    </div>
                                </Layout>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                AI Screening System ©{new Date().getFullYear()}
                            </Footer>
                        </Layout>
                    </Layout>
                </Col>
            </Row>
            </DataContext.Provider>
            
        </ThemeContext.Provider>
    )
}

export default MainLayout
