import { Outlet } from "react-router-dom"






const RootView = () => {

  return (
    <>   
    
    <main className="flex-grow-1">
        <Outlet/>
   
       
    </main>
    </>
  )
}
export default RootView