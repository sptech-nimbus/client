import axios from "axios";
import config from "./config";

const path = "injuries";

async function postInjury(body, token) {
    const response = await axios.post(`${config.baseURL}/${path}`, body, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getInjuriesFromAthlete(playerId, token) {
    const response = await axios.get(`${config.baseURL}/${path}/from-athlete/${playerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}


async function putInjury({ param, body }) {
    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)
    return response;
}

async function deleteInjury({ param }) {
    const response = await axios.delete(`${config.baseURL}/${path}/${param}`)
    return response;
}

const injury = {
    post: postInjury,
    put: putInjury,
    delete: deleteInjury,
    getInjuriesFromAthlete
}

export default injury;