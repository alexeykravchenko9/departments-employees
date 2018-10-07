import openSocket from 'socket.io-client';
let portDev = (process.env.NODE_ENV === 'prod') ? '/' : `:${SERVER_PORT}/`;

const socket = openSocket(`http://${SERVER_HOSTNAME}${portDev}`);

export const fetchDepartmentsSoc = (data) => {
    socket.emit('departments/fetchDepartmentsSoc', data);
};

export const getDepartmentsSoc = (cb) => {
    socket.on('departments/fetchDepartmentsSoc', data => cb(data));
};

export const connectionSuccess = (cb) => {
    socket.on('connectionSuccess', data => cb(data));
};
