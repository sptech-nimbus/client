/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "teams";

async function getAllTeams(headers = {}) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}`, headers)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        return response;
    }
    catch (err) {
        throw err
    }
}

async function registerTeam(body = {}, token) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function getActiveInjuries({ param }) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/active-injuries/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

async function getTeamEspecific({ param }) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

async function putTeam({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function requestChangeOwner({ param, body }) {
    try {
        const response = await axios.patch(`${config.baseURL}/${path}/change-owner-request/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function acceptChangeOwner({ param, body }) {
    try {
        const response = await axios.patch(`${config.baseURL}/${path}/change-team-owner-by-code/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function deleteTeam({ param, body }) {
    try {
        const response = await axios.delete(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

const team = {
    post: registerTeam,
    delete: deleteTeam,
    put: putTeam,
    get: getTeamEspecific,
    getActiveInjuries,
    getAllTeams,
    requestChangeOwner,
    acceptChangeOwner
}

export default team;