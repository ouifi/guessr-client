let baseURL = "";
if (process.env.NODE_ENV === "production") {
    const urlPieces = window.location.hostname.split(".");
    if (urlPieces.length < 4) {
        baseURL = `https://api.${window.location.hostname}`;
    } else {
        baseURL = "https://api.ouifi.io/"; // If in a staging frontend environment, use the prod api
    }
} else {
    baseURL = `/api`;
}

class API {
    static async get(url: string) {
        return fetch(`${baseURL}${url}`);
    }
}

export default API;