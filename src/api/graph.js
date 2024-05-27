import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/graphs`;

async function getWinsByTeam(teamId, matches, token) {
    const response = axios.get(`${url}/wins-by-team-matches/${teamId}?matches=${matches}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getPointsDivisionByTeam(teamId, matches, token) {
    const response = axios.get(`${url}/points-division-per-team/${teamId}?matches=${matches}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

async function getPointsPerGame(teamId, matches, token) {
    const response = axios.get(`${url}/points-per-game/${teamId}?matches=${matches}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

export default {
    getWins: getWinsByTeam,
    getPointsDivision: getPointsDivisionByTeam,
    getPointsPerGame
}