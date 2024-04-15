/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

const path = "users";

//ajustar o endpoint para o endpoint correto da api
async function getUserById(headers = {}) {
    try {
        const response = await axios.get(`${config.baseURL}/${path}`, headers);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function getUserSpecific(headers = {}) {
    try {
        const response = await axios.get(`${config.baseURL}/${payh}/specific`, headers);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function postUser(body = {}, headers = {}) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}`, body);
        console.log(response);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function putUser(body = {}, headers = {}) {
    try {
        const response = await axios.put(`${config.baseURL}/${path}`, body);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function deleteUser(params = {}) {
    try {
        const response = await axios.delete(`${config.baseURL}/${path}`, body);
        return response;
    }
    catch (err) {
        throw err;
    }
}

async function changePassword(id, body = {}) {
    try {
        const response = await axios.patch(`${config.baseURL}/${path}/change-password/${id}`, body);
        return response
    }
    catch (err) {
        throw err;
    }
}

async function login(body, headers = {}) {
    try {
        const response = await axios.post(`${config.baseURL}/${path}/login`);
        return response;
    }
    catch (err) {
        throw err;
    }
}

const user = {
    get: getUserById,
    getSpecific: getUserSpecific,
    post: postUser,
    put: putUser,
    delete: deleteUser,
    changePassword: changePassword,
    login: login,
}

export default user;