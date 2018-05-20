import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    this.tick = this.tick.bind(this)
  }

  tick() {
    fetch('/api/cryptoData')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
  }

  componentDidMount(){
    this.tick()
    this.interval = setInterval(this.tick, 60000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const tableHeaders = (<thead>
      <tr>
          <th>Cryptocurrency</th>
          <th>Symbol</th>
          <th>Price(USD)</th>
          <th>Updated</th>
      </tr>
    </thead>);

    return (
      <div className='crypto-table-container'>
        {this.state.data ? (
        <table className='crypto-table' width='100%'>
          {tableHeaders}
          <tbody>
            {this.state.data.map(e => (
              <tr><td>{e['name']}</td><td>{e['symbol']}</td><td>{e['usd']['price']}</td><td>{e['last_updated']}</td></tr>
            ))}
          </tbody>
        </table>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
      </div>
    );
  }
}
