import { useState, useEffect } from "react"

function App() {

const [users, setUsers] = useState([])

const [username, setUsername] = useState("")

const [userid, setUserid] = useState("")

const [editId, setEditId] = useState(null)


useEffect(() => {

fetch("http://localhost:5000/api/users")

.then(res => res.json())

.then(data => setUsers(data))

}, [])


const saveUser = () => {

if(editId){

fetch(`http://localhost:5000/api/users/${editId}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,userid})

}).then(loadUsers)

setEditId(null)

}

else{

fetch("http://localhost:5000/api/users",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({username,userid})

}).then(loadUsers)

}

setUsername("")
setUserid("")

}


const loadUsers = () => {

fetch("http://localhost:5000/api/users")

.then(res=>res.json())

.then(data=>setUsers(data))

}


const deleteUser = (id) => {

fetch(`http://localhost:5000/api/users/${id}`,{

method:"DELETE"

}).then(loadUsers)

}


const editUser = (user) => {

setUsername(user.username)

setUserid(user.userid)

setEditId(user._id)

}


return (

<div>

<h2>User Dashboard</h2>

<input

placeholder="Username"

value={username}

onChange={e=>setUsername(e.target.value)}

/>


<input

placeholder="User ID"

value={userid}

onChange={e=>setUserid(e.target.value)}

/>

<button onClick={saveUser}>{editId ? "Update User" : "Add User"}</button>
<hr/>
{
users.map(user=>(

<div key={user._id}>

<p>{user.username}</p>

<p>{user.userid}</p>

<button onClick={()=>editUser(user)}>Edit</button>

<button onClick={()=>deleteUser(user._id)}>Delete</button>

</div>
))
}
</div>

)
}

export default App