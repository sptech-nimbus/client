import { io } from 'socket.io-client';

const URL = 'http://nimbus.westus.cloudapp.azure.com:3001';

export const socket = io(URL, {
    autoConnect: false
});