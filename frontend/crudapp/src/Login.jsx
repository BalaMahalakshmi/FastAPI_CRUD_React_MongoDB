import { useState } from "react";
import axios from "axios";

const Login = ({ setRole }) => {

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

const login = async () => {

const res = await axios.post(
"http://127.0.0.1:8000/login",
null,
{
params:{username,password}
})

localStorage.setItem("token",res.data.access_token)

setRole(res.data.role)

}

return(

<div>

<h2>Login</h2>

<input
placeholder="username"
onChange={(e)=>setUsername(e.target.value)}
/>

<input
placeholder="password"
type="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={login}>Login</button>

</div>

)

}

export default Login