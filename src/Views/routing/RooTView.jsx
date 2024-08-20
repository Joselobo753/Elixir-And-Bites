import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"

const RootView = () => {
  return (
    <>    
    <Header/>
    <main>
        <Outlet/>
    </main>
    <footer>AGREGAR ALGO</footer>
    </>
  )
}
export default RootView