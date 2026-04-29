import Auth from "./Auth"
import Dashboard from "./components/UserCRUD"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App(){

const [role,setRole]=useState(null)
const [showAuth,setShowAuth]=useState(false)

return(

<>

{showAuth
? <Auth setRole={setRole} setShowAuth={setShowAuth}/>
: <Dashboard role={role} setShowAuth={setShowAuth}/>
}

<ToastContainer
position="top-right"
autoClose={2000}
theme="dark"
/>

</>

)

}

export default App