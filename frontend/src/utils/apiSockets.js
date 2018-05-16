import openSocket from 'socket.io-client';
const socket = openSocket(`http://${SERVER_HOSTNAME}:${SERVER_PORT}`);

export const fetchDepartmentsSoc = (data) => {
    socket.emit('departments/fetchDepartmentsSoc', data);
};

export const getDepartmentsSoc = (cb) => {
    socket.on('departments/fetchDepartmentsSoc', data => cb(data));
};

export const connectionSuccess = (cb) => {
    socket.on('connectionSuccess', data => cb(data));
};
