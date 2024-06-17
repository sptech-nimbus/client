/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "teams";

async function getAllTeamsByCoach(id, token) {
    const res = await axios.get(`${config.baseURL}/${path}/by-coach/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function getTeamByAthlete(id, token) {
    const res = await axios.get(`${config.baseURL}/${path}/by-athlete/${id}`, {
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
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function getActiveInjuries(param) {
    const response = await axios.get(`${config.baseURL}/${path}/active-injuries/${param}`)

    return response;
}

async function getTeamEspecific(id, token) {
    const response = await axios.get(`${config.baseURL}/${path}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

async function putTeam(teamId, body, token) {
    const response = await axios.put(`${config.baseURL}/${path}/${teamId}`, body, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

async function requestChangeOwner(param, body) {
    const response = await axios.patch(`${config.baseURL}/${path}/change-owner-request/${param}`, body)

    return response;
}

async function acceptChangeOwner(param, body) {

    const response = await axios.patch(`${config.baseURL}/${path}/change-team-owner-by-code/${param}`, body)

    return response;
}

async function deleteTeam(param, body) {
    const response = await axios.delete(`${config.baseURL}/${path}/${param}`, body)

    return response;
}

async function getByAthlete(id, token) {
    const response = await axios.get(`${config.baseURL}/${path}/by-athlete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    return response;
}

const downloadCSV = async () => {
    try {
        const response = await axios.get(`${config.baseURL}/teams/generate-csv/${sessionStorage.getItem('teamId')}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response;
    }
    catch (err) {
        console.log(err);
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
    acceptChangeOwner,
    byName: getTeamsByName,
    byUser: getAllTeamsByCoach,
    byAthlete: getTeamByAthlete,
    downloadCSV: downloadCSV
}

export default team;