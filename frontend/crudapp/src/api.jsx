import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const addUser = (data) => axios.post(`${BASE_URL}/add_user`, data);

export const getUsers = () => axios.get(`${BASE_URL}/users`);

export const deleteUser = (id) =>
  axios.delete(`${BASE_URL}/delete_user/${id}`);

export const updateUser = (id, data) =>
  axios.put(`${BASE_URL}/update_user/${id}`, data);