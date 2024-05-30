import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/graphs`;

async function getAllEvents(teamId, token) {
    const res = await axios.get(`${url}/all-events-by-team/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return res;
}

const graph = {
    allEvents: getAllEvents
}

export default graph;