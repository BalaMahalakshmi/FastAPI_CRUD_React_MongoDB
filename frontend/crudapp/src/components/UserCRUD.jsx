import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://127.0.0.1:8000";

const UserCRUD = () => {

  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);


  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleAddUser = async () => {

    if (editId) {

      await axios.put(`${API}/update_user/${editId}`, {
        username
      });

      setEditId(null);

    } else {

      await axios.post(`${API}/add_user`, {
        username
      });

    }

    setUsername("");
    fetchUsers();
  };


  const handleDelete = async (id) => {

    await axios.delete(`${API}/delete_user/${id}`);

    fetchUsers();
  };


  const handleEdit = (user) => {

    setUsername(user.username);
    setEditId(user.id);
  };


  return (
    <div className="container">

      <h2 className="title">User CRUD App</h2>

      <div className="input-section">

        <input
          className="input-box"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={handleAddUser}
        >
          {editId ? "Update User" : "Add User"}
        </button>

      </div>

      <ul className="user-list">

        {users.map((user) => (

          <li className="user-card" key={user.id}>

            <span>{user.username}</span>

            <div className="btn-group">

              <button
                className="edit-btn"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>

            </div>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default UserCRUD;