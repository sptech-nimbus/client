/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "codes";

async function validateCode({ code, date }) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}?code=${code}&date=${date}`)

        return response;
    } catch (err) {
        throw err;
    }
}

const code = {
    validateCode
}

export default code;