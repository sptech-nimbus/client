import axios from "axios";
import config from "./config";

//ajustar o endpoint para o endpoint correto da api
async function getUser(headers) {
   try {
      const response = await axios.get(`${config.baseURL}/user`, headers);
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
      throw err
   }
}

async function postUser(body, headers) {
   try {
      const response = await axios.post(`${config.baseURL}/user`, {headers: headers, body: body});
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
      throw err;
   }
}

async function putUser(body, headers) {
   try {
      const response = await axios.put(`${config.baseURL}/user`, {headers: headers, body: body});
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
      throw err;
   }
}

async function deleteUser(params) {
   try {
      const response = await axios.delete(`${config.baseURL}/user/${id}`, { params });
      return response;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
      throw err;
   }
}

const user = {
   get: getUser,
   post: postUser,
   put: putUser,
   delete: deleteUser,
}

export default user;