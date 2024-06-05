import axios from "axios";
import config from "./config";

const path = "athlete-historics";

async function postAthleteHistoric({ body }) {
    const response = await axios.post(`${config.baseURL}/${path}`, body)

    return response;
}

async function getAthleteHistorics(param, token) {
    const response = await axios.get(`${config.baseURL}/${path}/from-athlete/${param}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getAthleteHistoricsPageable({ param, page, elements }) {

    const response = await axios.get(`${config.baseURL}/${path}/page-from-athlete/${param}?page=${page}&elements=${elements}`)

    return response;

}

async function putAthleteHistoric({ param, body }) {

    const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

    return response;

}

async function deleteAthleteHistoric({ param }) {
    const response = await axios.delete(`${config.baseURL}/${path}/${param}`)

    return response;
}

const athleteHistoric = {
    post: postAthleteHistoric,
    get: getAthleteHistorics,
    getPage: getAthleteHistoricsPageable,
    put: putAthleteHistoric,
    delete: deleteAthleteHistoric
}

export default athleteHistoric;