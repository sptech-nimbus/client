/* eslint-disable no-useless-catch */

import axios from "axios";
import config from "./config";

const path = "athlete-descs";

async function registerAthleteDesc(body, token ) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body)
        return response;
    } catch (err) {
        throw err;
    }
}

async function getAthleteDesc({ param }) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

async function putAthleteDesc({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

const athleteDesc = {
    post: registerAthleteDesc,
    get: getAthleteDesc,
    put: putAthleteDesc
}

export default athleteDesc