import axios from "axios";
import config from "./config";

const path = "teams";

async function getAllTeamsByCoach(id, token) {
    const res = await axios.get(`${config.baseURL}/${path}/by-coach/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function getAllTeams(token) {
    const response = await axios.get(`${config.baseURL}/${path}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getTeamsByName(name, token) {
    const response = await axios.get(`${config.baseURL}/${path}/by-name?name=${name}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function registerTeam(body = {}, token) {
    const response = await axios.post(`${config.baseURL}/${path}`, {
        body,
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getActiveInjuries({ param }) {
    const response = await axios.get(`${config.baseURL}/${path}/active-injuries/${param}`)

    return response;
}

async function getTeamEspecific({ param }) {
    const response = await axios.get(`${config.baseURL}/${path}/${param}`)

    return response;
}

async function putTeam({ param, body }) {
    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

    return response;
}

async function requestChangeOwner({ param, body }) {
    const response = await axios.patch(`${config.baseURL}/${path}/change-owner-request/${param}`, body)

    return response;
}

async function acceptChangeOwner({ param, body }) {

    const response = await axios.patch(`${config.baseURL}/${path}/change-team-owner-by-code/${param}`, body)

    return response;
}

async function deleteTeam({ param, body }) {
    const response = await axios.delete(`${config.baseURL}/${path}/${param}`, body)

    return response;
}

const team = {
    post: registerTeam,
    delete: deleteTeam,
    put: putTeam,
    get: getTeamEspecific,
    getActiveInjuries,
    getAllTeams,
    requestChangeOwner,
    acceptChangeOwner,
    byName: getTeamsByName,
    byUser: getAllTeamsByCoach
}

export default team;