/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "users";


async function getUserById(id, token) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}

async function postUser(body = {}) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body);
        console.log(response);

        return response;
    }
    catch (err) {
        throw err;
    }
}

async function putUser(body = {}) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}`, body);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function deleteUser() {
    try {
        const response = await axios.delete(`${config.baseURL}/${path}`);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function changePassword(id, body) {
    try {
        const response = await axios.patch(`${config.baseURL}/${path}/change-password/${id}`, body);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function changePasswordRequest(email) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}/change-password-request`, {
            email,
            expirationDate: Date.now()
        });
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function login(body) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}/login`, body);
        return response;
    }
    catch (err) {
        throw err;
    }
}

const user = {
    get: getUserById,
    post: postUser,
    put: putUser,
    delete: deleteUser,
    changePassword,
    login,
    changePasswordRequest
}

export default user;