import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputNumber from './inputNumber'

export default class InputOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOperation: 'Update',
      inputs: Array(4).fill(1),
    }
    props.update(props.index, ['Update',...Array(4).fill(1)])
  }
  onChangeNumber = (event,key) => {
    let { inputs, typeOperation } = this.state
    const { index, update } = this.props
    const newValue = parseInt(event.target.value, 10)
    if(newValue){
      inputs[key] = newValue
      if(key < 3 && inputs.length === 6){
        if(inputs[key] > inputs[key + 3]){
          inputs[key + 3] = newValue
        }
      } else if(key < 6  && inputs.length === 6){
        if(inputs[key] < inputs[key - 3]){
          inputs[key - 3] = newValue
        }
      }
      this.setState({inputs})
      update(index, [typeOperation,...inputs])
    }
  }
  onChange = ({name, value}) =>{
    const { index, update } = this.props
    let arrayInputs
    if(value === 'Update'){
      arrayInputs = Array(4).fill(1);
    } else if(value === 'Query'){
      arrayInputs = Array(6).fill(1);
    }
    update(index, [value,...arrayInputs])
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
            return <input type="number" value={this.state.inputs[key]} onChange={(event) => this.onChangeNumber(event,key)} className="form-control" key={key} aria-label="Text input with dropdown button" />
          })
        }
      </div>
    );
  }
}

InputOperation.propTypes = {
  index: PropTypes.number,
  update: PropTypes.func,
};
