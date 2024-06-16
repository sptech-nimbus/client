import config from './config';
import axios from 'axios';

const url = `${config.baseURL}/trainings`;

const getTrainings = async (teamId, params, token) => {
   try {
      const response = await axios.get(`${url}/${teamId}?page=${params.page}&elements=${params.elements}`, {
         headers: { Authorization: `Bearer ${token}` }
      });
      return response;
   }
   catch(err) {
       throw err;
   }
}

const postTraining = async (body, token) => {
   try {
      const response = await axios.post(`${url}`, body, {
         headers: { Authorization: `Bearer ${token}` }
      });
      return response;
   }
   catch(err) {
       throw err;
   }
}

export default {
   get: getTrainings,
   post: postTraining
}