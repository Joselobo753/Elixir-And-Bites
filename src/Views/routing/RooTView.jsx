import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"
import ButtonLR from "../../components/common/button/ButtonLR"

const RooTView = () => {
  return (
    <>
    <Header/>
    <main>
        <Outlet/>
       <ButtonLR/>
    </main>
    <footer>AGREGAR ALGO</footer>
    </>
  )
}
export default RooTView