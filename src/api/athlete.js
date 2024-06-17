import axios from "axios";
import config from "./config";

const path = "athletes";

async function getUserById(id, token) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/ms-get-athlete/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

async function putAthlete(id, body, token) {
    console.log('id', id, 'body', body, 'token', token);
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${id}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response;
    }
    catch (err) {
        console.log(err);
    }
}

async function getByTeam(teamId, token) {
    const res = await axios.get(`${config.baseURL}/${path}/by-team/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function registerTeam(param, body, token) {
    const response = await axios.patch(`${config.baseURL}/${path}/register-team/${param}`, body, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

const athlete = {
    get: getUserById,
    put: putAthlete,
    registerTeam,
    byTeam: getByTeam
}

export default athlete;