let baseURL = "";
if (process.env.NODE_ENV === "production") {
    baseURL = `https://api.${window.location.hostname}`;
} else {
    baseURL = `/api`;
}

class API {
    static async get(url: string) {
        return fetch(`${baseURL}${url}`);
    }
}

export default API;