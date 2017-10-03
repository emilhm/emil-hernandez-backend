import React from 'react'

const Modal = ({results}) => {
  return (
    <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Resultados</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Resultados:
            { Array.isArray(results) && (
                results.map((item, key) => {
                  return(
                    <div key={key}>
                      <h3>Operacion: {key + 1}</h3>
                      <p>Result: {item || "No tiene resultado"}</p>
                    </div>
                  )
                })
              )
            }
            {
              !Array.isArray(results) && (
                  <p>{results.error}</p>
                )
            }
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
