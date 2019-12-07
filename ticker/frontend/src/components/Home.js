import React from 'react';
import { inject, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Dashboard from './Dashboard';
import Tickers from './Tickers';
import PageHeader from './PageHeader';

const { Header, Content, Sider } = Layout;

@inject('UserStore')
@observer
class Home extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <Router>
            <Layout style={{ minHeight: '100vh' }}>
            <Sider className="ticker-sider" breakpoint="lg" collapsedWidth="0">
                <div className="logo">
                    <span><strong><Link to="/">Ticker</Link></strong></span>
                </div>
                <Menu theme="dark" selectedKeys={this.props.UserStore.selectedKeys} mode="inline">
                <Menu.Item key="dashboard">
                    <Link to="/">
                        <Icon type="desktop" />
                        <span>Dashboard</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="tickers">
                    <Link to="/tickers">
                        <Icon type="pie-chart" />
                        <span>Tickers</span>
                    </Link>
                </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <PageHeader style={{ background: '#fff', padding: 0 }} />
                <Content style={{ margin: '50px' }}>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/tickers" component={Tickers} />
                </Content>
            </Layout>
            </Layout>
            </Router>
        );
    }
}

export default Home;