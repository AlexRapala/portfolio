import React from 'react';
import { inject, observer } from 'mobx-react';
import TickerSearch from './TickerSearch';
import { Card } from 'antd';

@inject('UserStore')
@observer
class Tickers extends React.Component {

    componentDidMount() {
        this.props.UserStore.setSelectedKeys(['tickers']);
    }

    render() {
        return (
            <Card style={{height: '100%'}}>
                <TickerSearch />
            </Card>
        );
    }
}

export default Tickers;