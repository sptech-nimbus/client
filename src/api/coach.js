import axios from "axios";
import config from "./config";

const path = "coaches";

async function putCoach({ param, body }) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}/${param}`, body)

        return response;
    } catch (err) {
        throw err;
    }
}

const coach = {
    put: putCoach
}

export default coach;