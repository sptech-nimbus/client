import axios from "axios";
import config from "./config";

const path = "blob-storage";

async function postBlobStorage(file, token, entity) {
    const data = new FormData();
    data.append('file', file, file.name);
    
    const response = await axios.post(`${config.baseURL}/${path}/${entity}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    })

    return response;
}

const blobStorage = {
    post: postBlobStorage
}

export default blobStorage;