import { useState } from 'react';
import Menu from 'antd/es/menu';
import Layout from 'antd/es/layout';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('User Management', 'sub1', <UserOutlined />, [
        getItem('User', '3'),
        getItem('Role', '4')
    ])
];

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    )
}

export default Sidebar
