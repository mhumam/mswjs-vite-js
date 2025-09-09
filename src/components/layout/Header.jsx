import React from 'react';
import Layout from 'antd/es/layout';
import theme from 'antd/es/theme';

const { Header } = Layout;

const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return <Header style={{ padding: 0, background: colorBgContainer }} />
}

export default App;
