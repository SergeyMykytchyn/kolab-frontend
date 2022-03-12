export const getConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
    "Accept": "application/json"
  }
};

const localhost_backend_api = "http://localhost:5000/api";
const deploy_backend_api = "https://kolab-backend.herokuapp.com/api";

const localhost_backend = "http://localhost:5000";
const deploy_backend = "https://kolab-backend.herokuapp.com";

const localhost_frontend = "http://localhost:3000";
const deploy_frontend = "https://kolab-frontend.herokuapp.com";

export const HOST = deploy_frontend;

export const SERVER_HOST = localhost_backend;

export const SERVER_HOST_API = localhost_backend_api;
