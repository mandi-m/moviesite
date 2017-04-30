import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

export default class BasicSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 1950, max: 2010 },
    };
  }

  render() {
    return (
      <InputRange
        maxValue={2017}
        minValue={1888}
        value={this.state.value}
        onChange={value => this.setState({ value })} />
    );
  }
}
