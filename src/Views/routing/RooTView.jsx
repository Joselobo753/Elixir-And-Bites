import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"
import ButtonLR from "../../components/common/button/ButtonLR"

import ModalLR from "../../components/common/LogReg/ModalLR"


const RooTView = () => {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
       <ButtonLR/>
       <ModalLR/>
    </main>
    <footer>AGREGAR ALGO</footer>
    </>
  )
}
export default RooTView