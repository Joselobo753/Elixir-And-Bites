import { Outlet } from "react-router-dom"
import Header from "../../components/common/Header/Header"
import Footer from "../../components/common/Footer/Footer"






const RootView = () => {

  return (
    <>   
    
    <main className="flex-grow-1">
      <Header/>
        <Outlet/>
   <Footer/>
       
    </main>
    </>
  )
}
export default RootView