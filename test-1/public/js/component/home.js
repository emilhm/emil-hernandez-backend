import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TestCase from './TestCase'
import InputNumber from './inputNumber'

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testCasesLength: 1,
      renderMap:[0]
    }
  }
  onChangeNumber = (name, value) =>{
    const newValue = parseInt(value)
    this.setState({
      [name]: parseInt(newValue),
      renderMap: Array(newValue).fill(0)
    })
  }

  render() {
    return (
      <div className="container">
        <h3>
          Cantida de pruebas <InputNumber value={this.state.testCasesLength} onChange={this.onChangeNumber} name="testCasesLength" placeholder="Cantida de test cases" />
        </h3>
        {
          this.state.renderMap.map((item, key) => <TestCase index={key} key={key} />)
        }
      </div>
    );
  }
}

Home.propTypes = {
};
