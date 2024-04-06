import axios from "axios";
import config from "./config";

const path = "users";

//ajustar o endpoint para o endpoint correto da api
async function getUserById(headers = {}) {
   try {
<<<<<<< Updated upstream
      const response = await axios.get(`${config.baseURL}/user`, headers);
=======
      const response = await axios.get(`${config.baseURL}/${path}`, headers);
>>>>>>> Stashed changes
      return response;
   }
   catch(err) {
      throw err
   }
}

<<<<<<< Updated upstream
async function postUser(body, headers) {
   try {
      const response = await axios.post(`${config.baseURL}/user`, {headers: headers, body: body});
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
=======
async function postUser(body = {}, headers = {}) {
   try {
      const response = await axios.post(`${config.baseURL}/${path}`, body);
      return response;
   }
   catch(err) {
>>>>>>> Stashed changes
      throw err;
   }
}

<<<<<<< Updated upstream
async function putUser(body, headers) {
   try {
      const response = await axios.put(`${config.baseURL}/user`, {headers: headers, body: body});
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
=======
async function putUser(body = {}, headers = {}) {
   try {
      const response = await axios.put(`${config.baseURL}/${path}`, body);
      return response;
   }
   catch(err) {
>>>>>>> Stashed changes
      throw err;
   }
}

<<<<<<< Updated upstream
async function deleteUser(params) {
   try {
      const response = await axios.delete(`${config.baseURL}/user/${id}`, { params });
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
=======
async function deleteUser(params = {}) {
   try {
      const response = await axios.delete(`${config.baseURL}/${path}`, body);
      return response;
   }
   catch(err) {
      throw err;
   }
}

async function changePassword(id, body = {}) {
   try {
      const response = await axios.patch(`${config.baseURL}/${path}/change-password/${id}`, body);
      return response
   }
   catch(err) {
      throw err;
   }
}

async function login(body, headers = {}) {
   try {
      const response = await axios.post(`${config.baseURL}/${path}/login`);
      return response;
   }
   catch(err) {
>>>>>>> Stashed changes
      throw err;
   }
}

const user = {
<<<<<<< Updated upstream
   get: getUser,
   post: postUser,
   put: putUser,
   delete: deleteUser,
=======
   get: getUserById,
   post: postUser,
   put: putUser,
   delete: deleteUser,
   changePassword: changePassword,
   login: login,
>>>>>>> Stashed changes
}

export default user;