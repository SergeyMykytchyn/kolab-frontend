export const getConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
    "Accept": "application/json"
  }
};

export const HOST = "http://localhost:3000";

export const SERVER_HOST = "http://localhost:5000";
