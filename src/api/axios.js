import axios from "axios";

const BASEAPIURL = "https://sugarytestapi.azurewebsites.net";
export const IMAGEBASEURL = "https://d1wh1xji6f82aw.cloudfront.net";

export const api = axios.create({
    baseURL: BASEAPIURL
});