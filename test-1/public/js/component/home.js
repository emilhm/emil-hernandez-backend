import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TestCase from './TestCase'
import InputNumber from './inputNumber'
import Modal from './modal'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCasesLength: 1,
      renderMap:[0],
      results: [],
    }
  }
  updateTestCases = (indexTestCase, arrayTestCase) => {
    let { renderMap } = this.state
    renderMap[indexTestCase] = arrayTestCase;
    this.setState({renderMap})
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
  serialize = (obj, prefix) => {
    const str = [];

    Object.keys(obj).forEach((p) => {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];

      str.push((v !== null && typeof v === 'object') ?
        this.serialize(v, k) :
        `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
    });

    return str.join('&');
  }
  onSubmit = () => {
    const urlParams = `?${this.serialize({'tests': this.state.renderMap})}`;
    fetch(`http://127.0.0.1:8000/Matrix${urlParams}`,
    {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
    })
    .then((res) => { return res.json(); })
    .then((results) => {
      this.setState({results})
    })
    .catch((err) => {
      this.setState({results: err})
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
          <button onClick={this.onSubmit} type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModal">Enviar</button>
        </div>
        <Modal results={this.state.results} />
      </div>
    );
  }
}

Home.propTypes = {
};
