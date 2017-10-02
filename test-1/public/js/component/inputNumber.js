import React, { PropTypes } from 'react'
import PropTypes from 'prop-types'

const InputNumber = (props) => {
  return (
    <input type="number" name={name} onChange={onChange} placeholder={placeholder} />
  )
}

input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputNumber
