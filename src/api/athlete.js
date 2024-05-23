import axios from "axios";
import config from "./config";

const path = "athletes";

async function putAthlete({ param, body }) {
    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body);

    return response;
}

async function getByTeam(teamId, token) {
    const res = await axios.get(`${config.baseURL}/${path}/by-team/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function registerTeam({ param, body, token }) {
    const response = await axios.patch(`${config.baseURL}/${path}/register-team/${param}`, body, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

const athlete = {
    put: putAthlete,
    registerTeam,
    byTeam: getByTeam
}

export default athlete;