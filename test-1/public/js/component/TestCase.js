import React, {Component} from 'react'
import PropTypes from 'prop-types'
import InputNumber from './inputNumber'
import InputOperation from './inputOperation'

export default class TestCase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrixLength: 1,
      operationLength: 1,
      renderMap: [0],
    }
  }
  updateOperation = (indexOp, arrayOp) => {
    const { index, update} = this.props
    let { renderMap } = this.state
    renderMap[indexOp] = arrayOp;
    this.setState({renderMap})
    update(index, {
      matrixLength: this.state.matrixLength,
      operations: renderMap,
    });
  }
  onChangeNumber = (name, value) =>{
    const { index, update} = this.props
    const newValue = parseInt(value)
    if(name === 'operationLength'){
      let { renderMap } = this.state
      if(newValue < renderMap.length){
        renderMap.splice(renderMap.length - 1,1)
      }else{
        renderMap.push(0)
      }
      this.setState({
        [name]: parseInt(newValue),
        renderMap: renderMap
      })
    } else{
      this.setState({
        [name]: newValue
      })
      update(index, {
        matrixLength: newValue,
        operations: this.state.renderMap,
      });
    }
  }
  render() {
    const { index } = this.props
    return (
      <div className="container content-testcase">
        <h4>Prueba {index+1}</h4>
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
                    <div className="row no-gutters content-operation" key={key}>
                      <InputOperation index={key} update={this.updateOperation} />
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
  index: PropTypes.number,
  update: PropTypes.func,
};
