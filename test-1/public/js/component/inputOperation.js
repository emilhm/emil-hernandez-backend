import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputNumber from './inputNumber'

export default class InputOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOperation: 'Query',
      inputs: Array(4).fill(0),
    }
  }
  onChange = ({name, value}) =>{
    let arrayInputs
    if(value === 'Query'){
      arrayInputs = Array(4).fill(0);
    } else if(value === 'Update'){
      arrayInputs = Array(7).fill(0);
    }
    this.setState({
      [name]: value,
      inputs: arrayInputs,
    })
  }
  render() {
    const { index } = this.props
    return (
      <div className="input-group">
        <div className="input-group-btn">
          <button type="button" onChange={this.onChange} className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {this.state.typeOperation || 'Seleccione una operacion'}
          </button>
          <div className="dropdown-menu">
            {this.state.typeOperation !=='Query' &&(<a className="dropdown-item" onClick={() => this.onChange({name:'typeOperation',value:'Query'})}>Query</a>)}
            {this.state.typeOperation !=='Update' &&(<a className="dropdown-item" onClick={() => this.onChange({name:'typeOperation',value:'Update'})}>Update</a>)}
          </div>
        </div>
        {
          this.state.inputs.map((item, key) => {
            return <input type="number" min="1" className="form-control" key={key} aria-label="Text input with dropdown button" />
          })
        }
      </div>
    );
  }
}

InputOperation.propTypes = {
  index: PropTypes.number
};
