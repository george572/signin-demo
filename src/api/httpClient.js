import axios from "axios";
const httpClient = axios.create({
    baseURL: "https://j17lt.csb.app/",
    headers: {
        "Content-Type": "application/json",
    }
});

export default httpClient