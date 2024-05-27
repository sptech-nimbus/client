import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/graphs`;

async function getWinsByTeam(teamId, matches, token) {
    const response = axios.get(`${url}/wins-by-team-matches/${teamId}?matches=${matches}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}

export default {
    getWins: getWinsByTeam
}