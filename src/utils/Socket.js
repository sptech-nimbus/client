import { io } from 'socket.io-client';
import config from "../api/config";

const URL = `${config.baseURLChat}/`;

export const socket = io(URL, {
    autoConnect: false
});