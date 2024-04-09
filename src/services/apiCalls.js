import axios from "axios";

// const API_RM_URL = "https://rickandmortyapi.com/api";
const API_URL = "http://localhost:3000/api";
// const API_URL = "aquí hay una url para un entorno de desarrollo"

export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}/auth/register`, credentials);
};

export const loginCall = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  const res = await axios.get(`${API_URL}/users/profile`, config);
  return res.data;
};

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`${API_URL}/users/profile/update`,data, config);
  return res;
};

// .get("url", {headers})
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})
