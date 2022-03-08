import axios from "axios";
import { SERVER_HOST_API } from "../constants/index";

export default axios.create({
  baseURL: SERVER_HOST_API
});
