let baseURL = "";
if (process.env.NODE_ENV === "production") {
    baseURL = `https://api.${window.location.hostname}`;
} else {
    baseURL = `/api`;
}

class API {
    static async newGame() {
        const urlPieces = window.location.hostname.split(".");
        if (urlPieces.length < 4) { // If in a staging frontend environment, use fixed data just to test the UI
            return API.get("/newgame")
                .then(
                    (res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    }
                );
        } else {
            return new Promise(
                (resolve) => {
                    setTimeout(() => {
                        resolve({ "subreddit": "Scams", "posts": [{ "title": "I told this scammer I own a fruit company called Fruity Guys. Told him I could only send money if he posed for my advertisement first.", "image": "https://preview.redd.it/3hl5fx5zvzt61.jpg?auto=webp&s=03468f48e940fbdd41c59d4536aa037c852e8d88" }, { "title": "This sub is here to support people, not show how smart you are for not being scammed", "image": null }, { "title": "They attempt to sell you fake merchandise by pretending to be someone asking for a place to buy the product, then reply with another account linking it. Both accounts are brand new.", "image": "https://preview.redd.it/yp456nl124t61.jpg?auto=webp&s=98baf362a1e07944712f6028b8a1e408e1cbe22d" }, { "title": "Does Reddit do any vetting on their ads? Scamtastic", "image": "https://preview.redd.it/yjvu513pxkt61.jpg?auto=webp&s=af04b67546fa08b3745f9204888d130bd3a54edc" }, { "title": "My grandfather almost fell for this. If I hadn't seen this letter on the countertop before I left his house, he was gonna follow the steps the next day.", "image": "https://preview.redd.it/z156pkbwg0t61.jpg?auto=webp&s=294423d1f84608eca9cc02089ba3cf3ff3e9ff40" }, { "title": "I got sick of fake reviews online fooling customers into buying shitty products and services so I made a video on how to spot them", "image": "https://external-preview.redd.it/vNnfKDj9nKsC0HG5TaGfQBs5W4SIVkFVxVdLUK_MD0g.jpg?auto=webp&s=dcd0d8efe2523a82ccf581f24c0342dc6d8bb671" }, { "title": "This guy scammed my grandma out of $35. This guy claims to be able to hack into YouTube servers and recover 7+ year old accounts. he stole my grandma's money and is now demanding she buy him a steam gift card. What should I do?", "image": "https://preview.redd.it/evst9eywvft61.jpg?auto=webp&s=aa93d08302d82ec932ef3e5da6e7831577ccbcc4" }, { "title": "Has anyone had this before", "image": null }, { "title": "Well this one certainly grabs your attention. Anyone else seen anything like this?", "image": "https://preview.redd.it/knd5rfmc9ut61.jpg?auto=webp&s=6c5359507f3eec1d268717aa4f9566026de71879" }, { "title": "PayPal Phishing Scam!", "image": "https://preview.redd.it/j33ndrbvigt61.jpg?auto=webp&s=9cc931c83b6bc08e8a4107cb6bc58948c91d0015" }, { "title": "Another day another scam.", "image": null }, { "title": "Red bubble will scam you as an artist", "image": null }, { "title": "Silly me, I forgot to pick up my 5.5Mil again.", "image": null }, { "title": "This Reddit scammer has got math for sale! I’m sure it is fire 🔥", "image": null }, { "title": "My dad got a weird text and immediately replied with \"no\". He does have a Capitol One account but not one ending in 4929 and no unusual activity. Any explanations?", "image": "https://preview.redd.it/i9szz71l1yt61.jpg?auto=webp&s=f5be16ae8989ee264e47a4fb833485897b458186" }, { "title": "Discord Scam, I should have led him on more but I ended it anyway, he blocked me lmao", "image": "https://preview.redd.it/93w1mejzgzt61.png?auto=webp&s=8ebef86499622717db92d1bf3c167886cdd03e9e" }, { "title": "This scam text gave me a big laugh. Anyone else seen this url?", "image": "https://preview.redd.it/etysnydl1tt61.jpg?auto=webp&s=6346ae99f0679d8e4ddee39b7abc64db1f8faf90" }, { "title": "Has anyone received an email like this? Seems I’ve inherited $10.5 million lol", "image": "https://preview.redd.it/zv1jfcbt1tt61.jpg?auto=webp&s=96be28ff00e409359a3ebe44083b6c521c15e8ff" }, { "title": "So many \"grandma\" scam calls", "image": null }, { "title": "Beware of VRBO", "image": null }, { "title": "Last week i was lucky enough to meet the highly regarded Mr. Loper. Now, say hello to Mr. Lucas, his business partner. The totally real and not creepy at all bots are having a normal, natural discussion about the genius of this man. Looks like it's time to withdraw all my savings to invest.", "image": "https://preview.redd.it/y3zualw9edt61.jpg?auto=webp&s=8047f0adbd38a1594a5f3a36fff4d2dd7703a193" }, { "title": "RIFG Scam... So good, I had hoped it was true!", "image": null }, { "title": "My sex life defies every religion in the world!", "image": "https://preview.redd.it/ah9l7topyys61.jpg?auto=webp&s=da75f311813f3636b0291de36ab57b6f17eda137" }, { "title": "I got scammed and I feel stupid", "image": null }, { "title": "That's one late package...", "image": "https://preview.redd.it/u97zkjnslst61.png?auto=webp&s=7241eb950a30d5b96f36c5231b6223a4b15f5bab" }] });
                    }, 750); // About average response time
                }
            );
        }
    }

    static async get(url: string) {
        return fetch(`${baseURL}${url}`);
    }
}

export type AppData = {
    subreddit: string,
    posts: PostData[]
};

export type PostData = {
    title: string,
    image: string | null
}

export default API;