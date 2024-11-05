/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "games";
const resultPath = "game-results";

async function postGame(body, token) {
    try {
        console.log("Attempting to post game:", body);
        const response = await axios.post(`${config.baseURL}/${path}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Game posted successfully:", response);
        return response;
    } catch (err) {
        console.log("Error posting game:", err);
        throw err;
    }
}

async function getByTeam(id, token) {
    const response = await axios.get(`${config.baseURL}/${path}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

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

async function confirmGame(game, coach, token) {
    try {
        const res = await axios.patch(`${config.baseURL}/${path}/confirm-game/${game}`, coach, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res;
    }
    catch (err) {
        throw err;
    }
}

async function registerGameResult(body, token) {
    try {
        const response = await axios.post('${config.baseURL}/game-results', body,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return (response.data.data);
    } catch (err) {
        throw err
    }
}

async function getNotConfirmedResults(team, token) {
    try {
        const res = await axios.get(`${config.baseURL}/${resultPath}/not-confirmed-results/${team}`,
            {
                headers: { Authorization: `Beaerer ${token}` }
            })

        return res;
    }
    catch (err) {
        throw err;
    }
}

async function confirmGameResult(game, body, token) {
    try {
        const res = await axios.patch(`${config.baseURL}/${resultPath}/confirm-game-result/${game}`, body, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return res;
    }
    catch (err) {
        throw err;
    }
}

export default {
    post: postGame,
    getByTeam,
    lastGame: getlastGame,
    nextGame: getNextGame,
    confirm: confirmGame,
    result: {
        post: registerGameResult,
        notConfirmed: getNotConfirmedResults,
        confirm: confirmGameResult
    }
}