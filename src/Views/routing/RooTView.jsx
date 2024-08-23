import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"


import ModalLR from "../../components/common/LogReg/ModalLR"


const RootView = () => {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
   
       <ModalLR/>
    </main>
    <footer>AGREGAR ALGO</footer>
    </>
  )
}
export default RootView