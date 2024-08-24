import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"

const RooTView = () => {

import ButtonLR from "../../components/common/button/ButtonLR"

import ModalLR from "../../components/common/LogReg/ModalLR"


const RootView = () => {

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
export default RootView