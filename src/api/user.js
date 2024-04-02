import axios from "axios";
import config from "./config";

//ajustar o endpoint para o endpoint correto da api
async function getUser(headers) {
   try {
      const response = await axios.get(`${config.baseURL}/user`);
      return response.data;
   }
   catch(err) {
      console.error("Erro na requisição da API.", err);
      throw err
   }
}

export const user = {
   get: getUser,
   //adicionar os outros métodos
}