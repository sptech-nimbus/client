import axios from "axios";
import config from "./config";

const path = "games";

async function postGame({ body }) {
    const response = await axios.post(`${config.baseURL}/${path}`, body);

    return response;
}

export default {
    post: postGame
}