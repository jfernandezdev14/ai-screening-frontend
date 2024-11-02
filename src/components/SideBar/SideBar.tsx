import React, { Dispatch, useState } from 'react'
import { Flex, Layout, Menu, MenuProps, MenuTheme, Switch } from 'antd'
import {
    AntDesignOutlined,
    DesktopOutlined,
    FileOutlined,
    SearchOutlined,
    TeamOutlined,
    CloudUploadOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'

interface SideBarProps {
    collapsed: boolean
    current: string
    setCurrent: Dispatch<string>
}

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem
}

const items: MenuItem[] = [
    getItem('AI Screening', '1', <TeamOutlined />, [
        getItem(
            <Link to="/search">Search Candidate</Link>,
            '2',
            <SearchOutlined />
        ),
    ]),
]

export function SideBar(props: SideBarProps) {
    const [customTheme, setCustomTheme] = useState<MenuTheme>('dark')
    const changeTheme = (value: boolean) => {
        setCustomTheme(value ? 'dark' : 'light')
    }

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e)
        props.setCurrent(e.key)
    }

    return (
        <Sider
            theme={customTheme}
            trigger={null}
            collapsible
            width={300}
            collapsed={props.collapsed}
            style={{ overflow: 'auto', minHeight: '100%', height: '100%' }}
        >
            <Flex style={{ margin: '0 16px', marginTop: '0 16px' }} vertical>
                <br />
                <Flex justify={'center'} align={'center'} vertical>
                    <AntDesignOutlined
                        style={{ fontSize: '60px', color: '#08c' }}
                    />
                </Flex>
                <br />
                <br />
                <Switch
                    checked={customTheme === 'dark'}
                    onChange={changeTheme}
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                />
                <br />
                <br />
                <Menu
                    theme={customTheme}
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    defaultOpenKeys={['1']}
                    items={items}
                    selectedKeys={[props.current]}
                    onClick={onClick}
                />
            </Flex>
        </Sider>
    )
}

export default SideBar
