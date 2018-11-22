const sendUpdatePing = (socket) => {
    socket.emit('toUpdate', () => {
        return false;
    });
}

export default sendUpdatePing;
