import axios from "axios";
import { SERVER_HOST } from "../constants";

export const imageExists = async (image_url) => {
  try {
    await axios.get(`${SERVER_HOST}/${image_url}`);
    return true;
  } catch(err) {
    return false;
  }
};
