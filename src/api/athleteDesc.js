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

async function getAthleteAllInfo(athleteId, token) {
    const res = await axios.get(`${config.baseURL}/${path}/all-info/${athleteId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function putAthleteDesc({ param, body }) {
    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

    return response;
}

const athleteDesc = {
    post: registerAthleteDesc,
    get: getAthleteDesc,
    put: putAthleteDesc,
    allInfo: getAthleteAllInfo
}

export default athleteDesc