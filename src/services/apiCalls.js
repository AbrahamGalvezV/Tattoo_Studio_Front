import axios from "axios";

//----------------------------------------------------------------

// const API_RM_URL = "https://rickandmortyapi.com/api";
const API_URL = "http://localhost:3000/api";
// const API_URL = "https://tattoo-studio-backend.vercel.app";

//----------------------------------------------------------------

// Registro de un nuevo usuario
export const registerNewUserCall = async (credentials) => {
  return await axios.post(`${API_URL}/auth/register`, credentials);
};

// Login usuario
export const loginCall = async (credentials) => {
  return await axios.post(`${API_URL}/auth/login`, credentials);
};

// Ver información de usuario
export const bringProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/users/profile`, config);
  return res.data;
};

// Actualizar información del perfil del usuario
export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`${API_URL}/users/profile/update`, data, config);
  return res;
};

// Ver lista de todos los usuarios
export const bringAllUsersCall = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/users?page=${current_page}&limit=${per_page}`, config);
  return res;
};

// Ver lista de artistas
export const bringAllArtistsCall = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/services/artists?page=${current_page}&limit=${per_page}`, config);
  return res;
};

// Ver lista de clientes
export const bringAllClientsCall = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/users/clients?page=${current_page}&limit=${per_page}`, config);
  return res;
};

// Borrar usuario por id
export const deleteUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}/users/${id}`, config);
};

// Sacar información del usuario por id
export const getUserById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/users/${id}`, config);
};

// Mostrar todas las citas
export const bringAllAppointments = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/appointments?page=${current_page}&limit=${per_page}`, config);
  return res;
};

// Borrar cita por id
export const deleteAppointmentById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.delete(`${API_URL}/appointments/${id}`, config);
};

// Ver todas las citas por artista logeado
export const getAppointmentsByLogedArtists = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/appointments/artist?page=${current_page}&limit=${per_page}`, config);
};

// Todas las citas por cliente logeado
export const getAppointmentsByLogedClients = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/appointments/client?page=${current_page}&limit=${per_page}`, config);
};

// Todas las citas por id
export const getAppointmentById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return axios.get(`${API_URL}/appointments/${id}`, config);
};

// Actualizar cita 
export const updateAppointment = async (dateId, data,  token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(`${API_URL}/appointments/${dateId}`,data, config);
  return res;
};

// Crear nueva cita
export const registerNewAppointment = async (credentials, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(`${API_URL}/appointments`, credentials, config);
};



// Ver lista de todos los usuarios
export const bringAllServices = async (token, current_page, per_page) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(`${API_URL}/services?page=${current_page}&limit=${per_page}`, config);
  return res;
};


// .get("url", {headers})
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})
