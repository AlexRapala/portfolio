import React from 'react';
import {Avatar, Dropdown, Menu} from 'antd';
import { inject, observer } from 'mobx-react';

@inject('UserStore')
@observer
class PageHeader extends React.Component {

    handleMenuClick = (e) => {
        if (e.key === 'logout') {
            this.props.UserStore.logout();
        }
    }

    menu = (
        <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="logout">Logout</Menu.Item>
        </Menu>
    )

    render() {
        return (
            <div style={{textAlign: 'right', height: '75px', padding: '18px 0', backgroundColor: '#fff'}}>
                <Dropdown overlay={this.menu} trigger={['click']}>
                    <Avatar size="large" icon="user"/>
                </Dropdown>
            </div>
        );
    }

}

export default PageHeader;