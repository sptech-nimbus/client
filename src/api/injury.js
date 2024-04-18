/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "injuries";

async function postInjury({ body }) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function getInjuriesFromAthlete({ param }) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}/from-athlete/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}


async function putInjury({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

async function deleteInjury({ param }) {
    try {
        const response = await axios.delete(`${config.baseURL}/${path}/${param}`)

        return response;
    } catch (err) {
        throw err;
    }
}

const injury = {
    post: postInjury,
    put: putInjury,
    delete: deleteInjury,
    getInjuriesFromAthlete
}

export default injury;