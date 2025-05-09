import axios from "axios";

// Base URL for the API
const BASE_API_URL = "https://sugarytestapi.azurewebsites.net";

// Base URL for images
export const BASE_IMAGE_URL = "https://d1wh1xji6f82aw.cloudfront.net";

// Create an instance of axios with the base URL set
export const api = axios.create({
    baseURL: BASE_API_URL
});
