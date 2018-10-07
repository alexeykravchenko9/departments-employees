let portDev = (process.env.NODE_ENV === 'prod') ? '/' : `:${SERVER_PORT}/`;


export const API_DEPARTMENT_URL = `http://${SERVER_HOSTNAME}${portDev}api/v1/departments`;
export const API_EMPLOYEE_URL = `http://${SERVER_HOSTNAME}${portDev}/api/v1/employees`;
export const API_LOGIN_URL = `http://${SERVER_HOSTNAME}${portDev}/api/v1/login`;
export const API_REGISTER_URL = `http://${SERVER_HOSTNAME}${portDev}/api/v1/register`;