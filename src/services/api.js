import axios from "axios";

export const api = axios.create({
    baseURL: "https://gdantasit-rocketnotes.onrender.com"
});

