import axios from "axios";

export const api = axios.create({
  baseURL: 'https://rocketnotes-api-o1n8.onrender.com'
});