import React from 'react';
import Layout from 'antd/es/layout';

const { Footer } = Layout;

const App = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    )
}

export default App
