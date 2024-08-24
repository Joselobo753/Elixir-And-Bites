
import ProductForm from "../../components/Admin/ProductForm"
// import ProductTabla from "../../components/Admin/ProductTabla"


const AdminView = () => {
  return (
    <div className="container d-flex flex-column align-items-center text-center px-3">
    <div className="justify-content-center w-100">
      <ProductForm />
      {/* <ProductTabla/> */}
    </div>
  </div>
  )
}

export default AdminView
