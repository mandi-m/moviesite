const React = require('react');
const ReactDOM = require('react-dom');
const Slider = require('rc-slider');

function log(value) {
  console.log(value); //eslint-disable-line
}


function percentFormatter(v) {
  return `${v} %`
}

export default class CustomizedSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 50,
    }
  }
  onSliderChange = (value) => {
    log(value)
    this.setState({
      value,
    })
  }
  onAfterChange = (value) => {
    console.log(value); //eslint-disable-line
  }
  render() {
    return (

      <Slider value={50} tipTransitionName="rc-slider-tooltip-zoom-down" onChange={this.onSliderChange} onAfterChange={this.onAfterChange} pushable={true}
      />

    )
  }
}


