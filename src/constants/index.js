export const getConfig = {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`,
    "Accept": "application/json"
  }
};
