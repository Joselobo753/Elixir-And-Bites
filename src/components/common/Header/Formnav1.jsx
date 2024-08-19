import React, { useState } from 'react';

function ReservationForm() {
  const [formType, setFormType] = useState('Reserva');
  const [motivo, setMotivo] = useState('');

  const handleFormTypeChange = (event) => {
    setFormType(event.target.value);
  };

  const handleMotivoChange = (event) => {
    setMotivo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a un servidor.
    alert(`Formulario enviado!\nTipo: ${formType}\nMotivo: ${motivo}`);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-dark text-white p-4 rounded">
      <h2 className="mb-4 text-center">Hacer Reserva o Sugerencia</h2>
        <div className="form-group mb-3">
              <div className='d-flex justify-content-between'>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="formType"
              id="reserva"
              value="Reserva"
              checked={formType === 'Reserva'}
              onChange={handleFormTypeChange}
            />
            <label className="form-check-label" htmlFor="reserva">
              Reserva
            </label>
          </div>
          <div className="form-check form-check-inline">
            

            <input
              className="form-check-input"
              type="radio"
              name="formType"
              id="sugerencia"
              value="Sugerencia"
              checked={formType === 'Sugerencia'}
              onChange={handleFormTypeChange}
              />
            <label className="form-check-label" htmlFor="sugerencia">
              Sugerencia
            </label>
           
          </div>
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="motivo" className="form-label">Motivo</label>
          <textarea
            className="form-control"
            id="motivo"
            value={motivo}
            onChange={handleMotivoChange}
            placeholder="No se piden los números a las meseras aquí"
            rows="3"
          />
        </div>
        <div className='text-end'> 

        <button type="submit" className="btn btn-warning">
          Enviar
        </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
