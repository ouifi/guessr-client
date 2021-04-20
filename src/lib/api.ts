let baseURL = "";
if (process.env.NODE_ENV === "production") {
    const urlPieces = window.location.hostname.split(".");
    if (urlPieces.length === 2) {
        baseURL = `https://api.${window.location.hostname}`;
    } else if (urlPieces.length === 3) {
        baseURL = "https://api.ouifi.io/";
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