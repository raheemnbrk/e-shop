import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

type registerUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type loginUser = {
  email: string;
  password: string;
};

export const registerUser = async (data: registerUser) => {
  const res = await axios.post("/api/users/register", data, {
    withCredentials: true,
  });
  return res.data;
};

export const loginUser = async (data: loginUser) => {
  const res = await axios.post("/api/users/login", data);
  return res.data;
};

export const authUser = async () => {
  const res = await axios.post("/api/users/is-auth");
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post("/api/users/logout");
  return res.data;
};
