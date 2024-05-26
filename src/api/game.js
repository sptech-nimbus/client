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

async function getlastGame(teamId, token) {
    const res = await axios.get(`${config.baseURL}/${path}/last-game/${teamId}?now=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

async function getNextGame(teamId, token) {
    const res = await axios.get(`${config.baseURL}/${path}/next-game/${teamId}?now=${Date.now()}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

export default {
    post: postGame,
    getByTeam,
    lastGame: getlastGame,
    nextGame: getNextGame
}