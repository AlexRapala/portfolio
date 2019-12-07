import React from 'react';
import { inject, observer } from 'mobx-react';
import { Icon, Card } from 'antd';

@inject('UserStore')
@observer
class Tickers extends React.Component {

    componentDidMount() {
        this.props.UserStore.setSelectedKeys(['dashboard']);
    }

    render() {
        return (
            <Card style={{height: '100%'}}>
                Dashboard
            </Card>
        );
    }
}

export default Tickers;