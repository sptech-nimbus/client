/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "athlete-descs";

async function registerAthleteDesc(body, token) {
    try {
        const response = await axios.post(
            `${config.baseURL}/${path}`,
            body,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response;
    } catch (err) {
        console.error('Erro ao registrar descrição do atleta:', err.response ? err.response.data : err.message);
        throw err;
    }
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

async function putAthleteDesc(param, body, token) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response;
    }
    catch (err) {
        throw err;
    }
}

const athleteDesc = {
    post: registerAthleteDesc,
    get: getAthleteDesc,
    put: putAthleteDesc,
    allInfo: getAthleteAllInfo
}

export default athleteDesc