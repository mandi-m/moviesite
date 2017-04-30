import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import InputRange from 'react-input-range';

class BasicSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: { min: 1950, max: 2010 },
    }
  }

  handleChange(valueObject) {
    this.props.setStartDate(valueObject.value.min + '-01-01')
    this.props.setEndDate(valueObject.value.max + '-12-31')
    this.setState(valueObject)
  }

  render() {
    return (
      <InputRange
        maxValue={2017}
        minValue={1888}
        value={this.state.value}
        onChange={value => this.handleChange({ value })} />
    )
  }
}

//========container for BasicSlider
import { setStartSearchDate, setEndSearchDate } from '../reducers/movies'

const mapStateToProps = (state, ownProps) => (
  {
    startSearchDate: state.movies.startSearchDate,
    endSearchDate: state.movies.endSearchDate
  }
)

const mapDispatchToProps = (dispatch) => ({
  setStartDate: (startDate) => {
    dispatch(setStartSearchDate(startDate))
  },
  setEndDate: (endDate) => {
    dispatch(setEndSearchDate(endDate))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicSlider)
