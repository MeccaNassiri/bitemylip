import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

let accessToken;
let refreshToken;

if (process.argv[1] === import.meta.filename) {
    //this is running from the cron job
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    dotenv.config({ path: `${__dirname}/../.env`, quiet: true });
    //
    //DO STUFF HERE THAT SHOULD BE DONE IN THE CRON JOB
    //
}

function getRequestForToken() {
    const spotifyTokenUrl = "https://accounts.spotify.com/api/token";
    const spotifyContentType = 'application/x-www-form-urlencoded';
    if (accessToken === null || accessToken === undefined) {
        return new Request(spotifyTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': spotifyContentType,
                'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_API_CLIENT_ID + ':' + process.env.SPOTIFY_API_CLIENT_SECRET).toString('base64'))
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials'
            })
        });
    }
    else {
        return new Request(spotifyTokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': spotifyContentType
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: process.env.SPOTIFY_API_CLIENT_ID
            })
        });
    }
}

async function tryGetToken() {
    try {
        const response = await fetch(getRequestForToken());
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        if (Object.hasOwn(json, 'refresh_token')) {
            if (json.refresh_token !== null && json.refresh_token !== undefined) {
                refreshToken = json.refresh_token;
            }
        }
        else if (accessToken === null || accessToken === undefined) {
            accessToken = json.access_token;
        }
    } catch (error) {
        console.error(error.message);
    }
}