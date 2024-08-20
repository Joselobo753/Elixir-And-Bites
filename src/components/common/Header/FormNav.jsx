const FormNav = () => {
  return (
    <div className="container">

    <div className="border p-2">
      <form action="">
        <div className="text-center">

        <h2>Hacer Reserva <br /> o <br /> Sugerencia</h2>
        </div>
        <div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    Reserva
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Sugerencia
  </label>
</div>
      </form>
    </div>
    </div>
  )
}
export default FormNav