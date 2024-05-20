import axios from "axios";
import config from "./config";

const path = "games";

async function postGame({ body }) {
    const response = await axios.post(`${config.baseURL}/${path}`, body);

    return response;
}

async function getByTeam(id) {
    const response = await axios.get(`${config.baseURL}/${path}/${id}`);

    return response;
}

export default {
    post: postGame,
    getByTeam
}