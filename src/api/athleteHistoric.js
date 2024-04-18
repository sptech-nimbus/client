/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "athlete-historics";

async function postAthleteHistoric({ body }) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function getAthleteHistorics({ param }) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/from-athlete/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

async function getAthleteHistoricsPageable({ param, page, elements }) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/page-from-athlete/${param}?page=${page}&elements=${elements}`)

        return response;
    } catch (err) {
        throw err;
    }
}

async function putAthleteHistoric({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function deleteAthleteHistoric({ param, body }) {
    try {
        const response = await axios.delete(`${config.baseURL}/${path}/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

const athleteHistoric = {
    post: postAthleteHistoric,
    get: getAthleteHistorics,
    getPage: getAthleteHistoricsPageable,
    put: putAthleteHistoric,
    delete: deleteAthleteHistoric
}

export default athleteHistoric;