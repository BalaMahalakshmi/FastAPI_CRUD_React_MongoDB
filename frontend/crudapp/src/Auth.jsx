import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const API = "http://127.0.0.1:8000"

const Auth = ({ setRole, setShowAuth }) => {

const [isRegister,setIsRegister]=useState(true)

const [form,setForm]=useState({
username:"",
password:"",
role:"student"
})


const submit = async () => {

try{

if(!form.username || !form.password){

toast.error("Please fill all fields")

return

}


if(isRegister){

await axios.post(
`${API}/register`,
form
)

toast.success("✅ Registered successfully")

setIsRegister(false)

}else{

const res = await axios.post(
`${API}/login`,
form
)

const targetPage = localStorage.getItem("targetPage")

if(targetPage){

localStorage.setItem("page",targetPage)

}else{

localStorage.setItem(
"page",
res.data.role==="teacher"
? "teachers"
: "students"
)

}

toast.success("✅ Login successful")

setRole(res.data.role)

setShowAuth(false)

}

}catch(err){

toast.error(
err.response?.data?.detail
|| "❌ Invalid credentials"
)

}

}


return(

<div className="auth-container">

<div className="auth-card">

<h2>

{isRegister ? "Register" : "Login"}

</h2>

<input
placeholder="Username"
value={form.username}
onChange={(e)=>
setForm({...form,username:e.target.value})
}
/>

<input
type="password"
placeholder="Password"
value={form.password}
onChange={(e)=>
setForm({...form,password:e.target.value})
}
/>

{isRegister && (

<select
value={form.role}
onChange={(e)=>
setForm({...form,role:e.target.value})
}
>

<option value="student">Student</option>
<option value="teacher">Teacher</option>

</select>

)}

<button onClick={submit}>

{isRegister ? "Register" : "Login"}

</button>

<p
style={{cursor:"pointer"}}
onClick={()=>
setIsRegister(!isRegister)
}
>

{isRegister
? "Already registered? Login"
: "New user? Register"}

</p>

</div>

</div>

)

}

export default Auth