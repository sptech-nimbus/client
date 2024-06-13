import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/codes`;

async function validateCode(code) {
    const response = await axios.get(`${url}/validate-code?code=${code}&now=${Date.now()}`);

    return response;
}

const code = {
    validateCode
}

export default code;