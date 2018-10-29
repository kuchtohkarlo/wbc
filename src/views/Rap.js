import React from 'react';
import { connect } from 'react-redux';

@connect(store => ({
  isIncrementing: store.counter.isIncrementing
}))
export default class Rap extends React.PureComponent {
  render () {
    const {
      isIncrementing,
      isDecrementing,
      increment,
      decrement,
      incrementAsync,
      decrementAsync
    } = this.props;
    return (
      <div style={{ background: 'red' }}>
        PAJAMA
  
        <p>
          <button onClick={ increment }>Increment</button>
          <button onClick={ incrementAsync } disabled={ isIncrementing }>Increment Async</button>
        </p>
  
        <p>
          <button onClick={ decrement }>Decrementing</button>
          <button onClick={ decrementAsync } disabled={ isDecrementing }>Decrement Async</button>
        </p>
      </div>
    );
  }
}

