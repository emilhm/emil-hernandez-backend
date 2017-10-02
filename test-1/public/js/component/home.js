import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TestCase from './TestCase'
import InputNumber from './inputNumber'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCasesLength: 1,
      renderMap:[0],
    }
  }
  updateTestCases = (indexTestCase, arrayTestCase) => {
    let { renderMap } = this.state
    renderMap[indexTestCase] = arrayTestCase;
    this.setState({renderMap})
    console.log(renderMap)
  }
  onChangeNumber = (name, value) =>{
    let { renderMap } = this.state
    const newValue = parseInt(value)
    if(newValue < renderMap.length){
      renderMap.splice(renderMap.length - 1,1)
    }else{
      renderMap.push(0)
    }
    this.setState({
      [name]: parseInt(newValue),
      renderMap: renderMap,
    })
  }
  onSubmit = () => {
    fetch("http://127.0.0.1:8000/Matrix",
    {
        method: "POST",
        body: this.state.renderMap,
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })
    .catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="container">
        <h3>
          Cantida de pruebas <InputNumber value={this.state.testCasesLength} onChange={this.onChangeNumber} name="testCasesLength" placeholder="Cantida de test cases" />
        </h3>
        {
          this.state.renderMap.map(
            (item, key) =>
            <TestCase index={key} update={this.updateTestCases} key={key} />
          )
        }
        <div className="submit">
          <button onClick={this.onSubmit} type="button" class="btn btn-secondary">Enviar</button>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
};
