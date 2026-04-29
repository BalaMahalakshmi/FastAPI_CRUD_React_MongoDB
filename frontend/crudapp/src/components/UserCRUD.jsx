import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar"

const API = "http://127.0.0.1:8000";

const Dashboard = ({ role, setShowAuth }) => {

const [page,setPage]=useState(

localStorage.getItem("page") || "dashboard"

)

useEffect(()=>{

localStorage.removeItem("page")

},[])

const [user,setUser]=useState({})
const [teacher,setTeacher]=useState({})

const [users,setUsers]=useState([])
const [teachers,setTeachers]=useState([])
const [search,setSearch]=useState("")


useEffect(()=>{

fetchStats()

if(page==="students"){
fetchUsers()
}

if(page==="teachers"){
fetchTeachers()
}

},[page])


const fetchUsers=async()=>{
const res=await axios.get(`${API}/users?search=${search}`)
setUsers(res.data)
}


const fetchTeachers=async()=>{
const res=await axios.get(`${API}/teachers`)
setTeachers(res.data)
}

const fetchStats = async () => {

const res = await axios.get(`${API}/stats`)

setUsers(new Array(res.data.students))
setTeachers(new Array(res.data.teachers))

}

const submitUser = async () => {

try{

if(user.id){

await axios.put(
`${API}/update_user/${user.id}`,
user
)

toast.success("Student updated successfully")

}else{

await axios.post(
`${API}/add_user`,
user
)

toast.success("Student added successfully")

}

setUser({})

fetchUsers()

}catch(err){

toast.error("Student action failed")

}

}


const submitTeacher = async () => {

try{

if(teacher.id){

await axios.put(
`${API}/update_teacher/${teacher.id}`,
teacher
)

toast.success("Teacher updated successfully")

}else{

await axios.post(
`${API}/add_teacher`,
teacher
)

toast.success("Teacher added successfully")

}

setTeacher({})

fetchTeachers()

}catch(err){

toast.error("Teacher action failed")

}

}


const deleteUser = async(id)=>{

try{

await axios.delete(
`${API}/delete_user/${id}`
)

toast.error("Student deleted successfully")

fetchUsers()

}catch(err){

toast.error("Delete failed")

}

}


const deleteTeacher = async(id)=>{

try{

await axios.delete(
`${API}/delete_teacher/${id}`
)

toast.error("Teacher deleted successfully")

fetchTeachers()

}catch(err){

toast.error("Delete failed")

}

}


const editUser=(data)=>{
setUser(data)
}


const editTeacher=(data)=>{
setTeacher(data)
}


return (

<div className="layout">

<Sidebar
setPage={setPage}
setShowAuth={setShowAuth}
/>

<div className="main-content">


{/* DASHBOARD */}

{page === "dashboard" && (

<div className="panel">

<h2>Dashboard Overview</h2>

<h3>Total Students: {users.length}</h3>

<h3>Total Teachers: {teachers.length}</h3>

</div>

)}


{/* TEACHER FORM */}

{page === "teachers" && (

<div className="panel-grid">


{/* LEFT SIDE FORM */}

<div className="panel">

<h2>Teacher Form</h2>

<input
placeholder="First Name"
value={teacher.first_name || ""}
onChange={(e)=>setTeacher({...teacher,first_name:e.target.value})}
/>

<input
placeholder="Last Name"
value={teacher.last_name || ""}
onChange={(e)=>setTeacher({...teacher,last_name:e.target.value})}
/>

<input
placeholder="Staff ID"
value={teacher.staff_id || ""}
onChange={(e)=>setTeacher({...teacher,staff_id:e.target.value})}
/>

<input
placeholder="Mobile"
value={teacher.mobile || ""}
onChange={(e)=>setTeacher({...teacher,mobile:e.target.value})}
/>

<input
placeholder="Email"
value={teacher.email || ""}
onChange={(e)=>setTeacher({...teacher,email:e.target.value})}
/>

<input
placeholder="Subject"
value={teacher.subject || ""}
onChange={(e)=>setTeacher({...teacher,subject:e.target.value})}
/>

<button onClick={submitTeacher}>
{teacher.id ? "Update Teacher" : "Submit Teacher"}
</button>

</div>


{/* RIGHT SIDE LIST */}

<div className="panel">

<h2>Existing Teachers</h2>

{teachers.map((t)=>(
<div key={t.id} className="list-item">

<div>
{t.first_name} {t.last_name}
</div>

<div className="button-column">

<button
className="edit-btn"
onClick={()=>editTeacher(t)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteTeacher(t.id)}
>
Delete
</button>

</div>

</div>
))}

</div>

</div>

)}


{/* STUDENT FORM */}

{page === "students" && (

<div className="panel-grid">

{/* LEFT SIDE FORM */}

<div className="panel">

<h2>Student Form</h2>

<input
placeholder="First Name"
value={user.first_name || ""}
onChange={(e)=>setUser({...user,first_name:e.target.value})}
/>

<input
placeholder="Last Name"
value={user.last_name || ""}
onChange={(e)=>setUser({...user,last_name:e.target.value})}
/>

<input
placeholder="Register Number"
value={user.register_number || ""}
onChange={(e)=>setUser({...user,register_number:e.target.value})}
/>

<input
placeholder="Mobile"
value={user.mobile || ""}
onChange={(e)=>setUser({...user,mobile:e.target.value})}
/>

<input
placeholder="Email"
value={user.email || ""}
onChange={(e)=>setUser({...user,email:e.target.value})}
/>

<button onClick={submitUser}>
{user.id ? "Update Student" : "Submit Student"}
</button>

</div>


{/* RIGHT SIDE LIST */}

<div className="panel">

<h2>Existing Students</h2>

{users.map((u)=>(
<div key={u.id} className="list-item">

<div>
{u.first_name} {u.last_name}
</div>

<div className="button-column">

<button
className="edit-btn"
onClick={()=>editUser(u)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteUser(u.id)}
>
Delete
</button>

</div>

</div>
))}

</div>

</div>

)}

</div>

</div>

)

}


export default Dashboard;