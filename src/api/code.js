import axios from "axios";
import config from "./config";

const url = `${config.baseURL}/codes`;

async function validateCode(code) {
    try {
        const response = await axios.get(`${url}/validate-code?code=${code}&now=${Date.now()}`, {
            headers: { "mode": "no-cors" }
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}

const code = {
    validateCode
}

export default code;