import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class InputNumber extends Component{
  constructor(props) {
    super(props);
    this.state = {
      valueInput: props.value || 1,
    }
  }
  onChange = (event) => {
    const { name, value } = event.target
    this.setState({valueInput: value})
    this.props.onChange(name, value)
  }
  render() {
    const { name,placeholder } = this.props
    return (
      <input type="number" className="form-control"  name={name} value={this.state.valueInput} onChange={this.onChange}  min="1" placeholder={placeholder} />
    )
  }
}

InputNumber.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.number
};
