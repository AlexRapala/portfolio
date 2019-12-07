import React from 'react';
import { AutoComplete } from 'antd';

import ApiClient from '../ApiClient';

const { Option } = AutoComplete;

class TickerSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        collapsed: false,
        tickers: [],
    };
  }

  handleChange = (ticker) => {
    const data = {
      'ticker': ticker
    }
    ApiClient.Stocks.get(data)
    .then(data => {
      console.log(data);
    })
  };

  searchTicker = (ticker) => {
    ApiClient.Stocks.search(ticker)
    .then(data => {
      try {
        this.setState({tickers: data['bestMatches']});
      }
      catch(error) {
        console.log(error)
      }
      
    });
  }

  render() {
    const search = this.state.tickers.map(record => <Option text={record['1. symbol']} key={record['1. symbol']}><span className="search-name">{record['2. name']}</span><span className="search-block"><span className="search-symbol">{record['1. symbol']}</span><span className="search-category">{record['3. type']}</span></span></Option>)
    return (
        <AutoComplete
          onSearch={(ticker) => {
            this.searchTicker(ticker);
          }}
          onSelect={(ticker) => {
            console.log(ticker);
            this.handleChange(ticker);
          }}
          optionLabelProp="text"
          style={{width: '350px'}}>
            {search}
          </AutoComplete>
    );
  }
}

export default TickerSearch;