/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

export async function getMessages(teamId, page, elements) {
    try {
        const res = await axios.get(`${config.baseURLChat}/messages/${teamId}?page=${page}&elements=${elements}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}