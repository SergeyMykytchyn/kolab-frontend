export const getConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
    "Accept": "application/json"
  }
};

console.log(process.env.REACT_APP_ENVIRONMENT);

const localhost_backend_api = "http://localhost:5000/api";
const deploy_backend_api = "https://kolab-backend.herokuapp.com/api";

const localhost_backend = "http://localhost:5000";
const deploy_backend = "https://kolab-backend.herokuapp.com";

const localhost_frontend = "http://localhost:3000";
const deploy_frontend = "https://kolab-frontend.herokuapp.com";

export const HOST = process.env.REACT_APP_ENVIRONMENT === "production" ? deploy_frontend : localhost_frontend;

export const SERVER_HOST = process.env.REACT_APP_ENVIRONMENT === "production" ? deploy_backend : localhost_backend;

export const SERVER_HOST_API =  process.env.REACT_APP_ENVIRONMENT === "production" ? deploy_backend_api : localhost_backend_api;
