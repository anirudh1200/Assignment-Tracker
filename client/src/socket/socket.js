import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:5000');

const sendUpdatePing = () => {
    socket.emit('toUpdate', () => {
        return false;
    });
}

export default sendUpdatePing;
