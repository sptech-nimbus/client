import axios from "axios";
import config from "./config";

const path = "athlete-descs";

async function registerAthleteDesc(body, token) {
    const response = await axios.post(`${config.baseURL}/${path}`, {
        body,
        headers: { Authorization: `Bearer ${token}` }
    });
    
    return response;
}

async function getAthleteDesc(athleteId, token) {
    const response = await axios.get(`${config.baseURL}/${path}/${athleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

async function putAthleteDesc({ param, body }) {
    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

    return response;
}

const athleteDesc = {
    post: registerAthleteDesc,
    get: getAthleteDesc,
    put: putAthleteDesc
}

export default athleteDesc