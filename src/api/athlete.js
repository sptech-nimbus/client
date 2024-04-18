/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "athletes";

async function putAthlete({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function registerTeam({ param, body }) {
    try {
        const response = await axios.patch(`${config.baseURL}/${path}/register-team/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

const athlete = {
    put: putAthlete,
    registerTeam
}

export default athlete;