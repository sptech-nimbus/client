import { io } from 'socket.io-client';
import config from "../api/config";

const URL = `http://${config.baseURLChat}:3001/`;

export const socket = io(URL, {
    autoConnect: false
});