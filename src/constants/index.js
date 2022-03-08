export const getConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
    "Accept": "application/json"
  }
};

const localhost_api = "http://localhost:5000/api";
const deploy_api = "https://kolab-backend.herokuapp.com/api";

const localhost = "http://localhost:5000";
const deploy = "https://kolab-backend.herokuapp.com";

export const HOST = "http://localhost:3000";

export const SERVER_HOST = deploy;

export const SERVER_HOST_API = deploy_api;
