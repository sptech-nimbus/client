/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "blob-storage";

async function postBlobStorage({headers, form}) {
    try {
        const response = await axios.postForm(`${config.baseURL}/${path}`, form, headers)

        return response;
    } catch (err) {
        throw err;
    }
}

const blobStorage = {
    post: postBlobStorage
}

export default blobStorage;