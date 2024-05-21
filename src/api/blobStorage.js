import axios from "axios";
import config from "./config";

const path = "blob-storage";

async function postBlobStorage({ file }) {
    const data = new FormData();
    data.append('file', file, file,name)
    try {
        const response = await axios.postForm(`${config.baseURL}/${path}`, {
            body: data,
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": 'multipart/form-data'
             }
        })

        return response;
    } catch (err) {
        throw err;
    }
}

const blobStorage = {
    post: postBlobStorage
}

export default blobStorage;