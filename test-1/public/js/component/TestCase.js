import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputNumber from './inputNumber'
import InputOperation from './inputOperation'

export default class TestCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixLength: 0,
      operationLength: 0,
      renderMap: [0],
      typeOperation: 'Query',
      inputs: Array(4).fill(0),
    }
  }
  onChange = ({name, value}) =>{
    let arrayInputs
    if(value === 'Query'){
      arrayInputs = Array(4).fill(0);
    } else if(value === 'Update'){
      arrayInputs = Array(6).fill(0);
    }
    this.setState({
      [name]: value,
      inputs: arrayInputs,
    })
  }
  onChangeNumber = (name, value) =>{
    const newValue = parseInt(value)
    if(name === 'operationLength'){
      this.setState({
        [name]: parseInt(newValue),
        renderMap: Array(newValue).fill(0)
      })
    } else{
      this.setState({
        [name]: newValue
      })
    }
  }
  render() {
    const { index } = this.props
    return (
      <div className="container content-testcase">
        Test {index+1}
        <div>
          <div>
            tamaño de Matrix <InputNumber value={this.state.matrixLength} onChange={this.onChangeNumber} name="matrixLength" placeholder="N"/>
          </div>
          <div>
            cantidad de operaciones <InputNumber value={this.state.operationLength} onChange={this.onChangeNumber} name="operationLength" placeholder="M"/>
          </div>
          <div>
            {
              this.state.renderMap.map(
                (item, key) => {
                  return (
                    <div className="row no-gutters" key={key}>
                      <InputOperation index={key} />
                    </div>
                  )
                })
            }
          </div>
        </div>
      </div>
    );
  }
}

TestCase.propTypes = {
};
