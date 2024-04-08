/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "teams";

async function getAllTeams(header = {}) {
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

async function registerTeam(body = {}, headers = {}) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body)
            .then(response => {
            console.log(response.data);
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

const team = {
    post: registerTeam,
}

export default team;