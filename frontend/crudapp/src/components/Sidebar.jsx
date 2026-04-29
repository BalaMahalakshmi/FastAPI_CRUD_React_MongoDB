const Sidebar = ({ setPage, setShowAuth }) => {

return (

<div className="sidebar">

<h2>ERP Panel</h2>

<ul>

<li onClick={()=>setPage("dashboard")}>
Dashboard
</li>

<li onClick={()=>{

localStorage.setItem("targetPage","students")

setShowAuth(true)

}}>
Students
</li>

<li onClick={()=>{

localStorage.setItem("targetPage","teachers")

setShowAuth(true)

}}>
Teachers
</li>

<li onClick={()=>setPage("settings")}>
Settings
</li>

</ul>

</div>

)

}

export default Sidebar