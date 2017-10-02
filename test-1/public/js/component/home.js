import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import InputNumber from './InputNumber'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        Cantida de test cases <input  type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
        <div className="container content-testcase">
          Test 1
          <div>
            <div>
            tamaño de Matrix <input  type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
            </div>
            <div>
            cantidad de operaciones <input  type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
            </div>
            <div>
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-group">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Seleccione una operacion
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item">Query</a>
                        <a class="dropdown-item">Update</a>
                      </div>
                    </div>
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                    <input type="number" min="1" class="form-control" aria-label="Text input with dropdown button" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
);
  }
}

Home.propTypes = {
};
