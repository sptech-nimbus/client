import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/graphs`;

async function getAllEvents(teamId, token) {
    try {
        const res = await axios.get(`${url}/all-events-by-team/${teamId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return res;
    }
    catch(err) {
        throw err;
    }
}

async function getWinsByTeam(teamId, matches, token) {
    try {
        const response = axios.get(`${url}/wins-by-team-matches/${teamId}?matches=${matches}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return response;
    }
    catch(err) {
        throw err;
    }
}

async function getPointsDivisionByTeam(teamId, matches, token) {
    try {
        const response = axios.get(`${url}/points-division-per-team/${teamId}?matches=${matches}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return response;
    }
    catch(err) {
        throw err;
    }
}

async function getPointsPerGame(teamId, matches, token) {
    try {
        const response = axios.get(`${url}/points-per-game/${teamId}?matches=${matches}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return response;
    }
    catch(err) {
        throw err;
    }
}

async function getFoulsPerGame(teamId, matches, token) {
    try {
        const response = axios.get(`${url}/fouls-per-game/${teamId}?matches=${matches}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        return response;
    }
    catch(err) {
        throw err;
    }
}

async function getReboundsPerTeam(teamId, matches, token) {
    try {
        const response = axios.get(`${url}/rebounds-per-game/${teamId}?matches=${matches}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response;
    }
    catch(err) {
        throw err;
    }
}

export default {
    getWins: getWinsByTeam,
    getPointsDivision: getPointsDivisionByTeam,
    getPointsPerGame,
    allEvents: getAllEvents,
    foulsPerGame: getFoulsPerGame,
    reboundsPerGame: getReboundsPerTeam
}
