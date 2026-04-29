import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const API = "http://127.0.0.1:8000";

const Dashboard = () => {

const [user,setUser]=useState({})
const [teacher,setTeacher]=useState({})

const [users,setUsers]=useState([])
const [teachers,setTeachers]=useState([])


useEffect(()=>{
fetchUsers()
fetchTeachers()
},[])


const fetchUsers=async()=>{
const res=await axios.get(`${API}/users`)
setUsers(res.data)
}


const fetchTeachers=async()=>{
const res=await axios.get(`${API}/teachers`)
setTeachers(res.data)
}


const submitUser = async () => {

console.log("Sending:", user)

if(user.id){

await axios.put(`${API}/update_user/${user.id}`,user)

}else{

await axios.post(`${API}/add_user`,user)

}

fetchUsers()
}


const submitTeacher=async()=>{

if(teacher.id){

await axios.put(`${API}/update_teacher/${teacher.id}`,teacher)

}else{

await axios.post(`${API}/add_teacher`,teacher)

}

setTeacher({})
fetchTeachers()
}


const deleteUser=async(id)=>{
await axios.delete(`${API}/delete_user/${id}`)
fetchUsers()
}


const deleteTeacher=async(id)=>{
await axios.delete(`${API}/delete_teacher/${id}`)
fetchTeachers()
}


const editUser=(data)=>{
setUser(data)
}


const editTeacher=(data)=>{
setTeacher(data)
}


return(

<div className="dashboard">


{/* TEACHER PANEL */}

<div className="panel">

<h2>Teacher Form</h2>

<input placeholder="First Name"
value={teacher.first_name||""}
onChange={(e)=>setTeacher({...teacher,first_name:e.target.value})}/>

<input placeholder="Last Name"
value={teacher.last_name||""}
onChange={(e)=>setTeacher({...teacher,last_name:e.target.value})}/>

<input placeholder="Staff ID"
value={teacher.staff_id||""}
onChange={(e)=>setTeacher({...teacher,staff_id:e.target.value})}/>

<input placeholder="Mobile"
value={teacher.mobile||""}
onChange={(e)=>setTeacher({...teacher,mobile:e.target.value})}/>

<input placeholder="Email"
value={teacher.email||""}
onChange={(e)=>setTeacher({...teacher,email:e.target.value})}/>

<input placeholder="Subject"
value={teacher.subject||""}
onChange={(e)=>setTeacher({...teacher,subject:e.target.value})}/>

<button onClick={submitTeacher}>
{teacher.id ? "Update Teacher" : "Submit Teacher"}
</button>


<ul>

{teachers.map(t=>(

<li key={t.id} className="list-item">

<div className="name-column">
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

</li>

))}

</ul>

</div>



{/* USER PANEL */}

<div className="panel">

<h2>Student Form</h2>

<input placeholder="First Name"
value={user.first_name||""}
onChange={(e)=>setUser({...user,first_name:e.target.value})}/>

<input placeholder="Last Name"
value={user.last_name||""}
onChange={(e)=>setUser({...user,last_name:e.target.value})}/>

<input placeholder="Register Number"
value={user.register_number||""}
onChange={(e)=>setUser({...user,register_number:e.target.value})}/>

<input placeholder="Mobile"
value={user.mobile||""}
onChange={(e)=>setUser({...user,mobile:e.target.value})}/>

<input placeholder="Email"
value={user.email||""}
onChange={(e)=>setUser({...user,email:e.target.value})}/>

<button onClick={submitUser}>
{user.id ? "Update User" : "Submit User"}
</button>


<ul>

{users.map(u=>(

<li key={u.id} className="list-item">

<div className="name-column">
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

</li>

))}

</ul>

</div>


</div>

)

}

export default Dashboard;