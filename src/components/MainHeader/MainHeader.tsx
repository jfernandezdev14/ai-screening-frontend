import React, {Dispatch} from "react";
import {Button, Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

interface MainHeaderProps {
    colorBgContainer: string
    collapsed: boolean
    setCollapsed: Dispatch<boolean>
}

const {Header} = Layout;

export function MainHeader(props: MainHeaderProps) {
    return (
        <Header style={{padding: 0, background: props.colorBgContainer}}>
            <Button
                type="text"
                icon={props.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                onClick={() => props.setCollapsed(!props.collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}

export default MainHeader