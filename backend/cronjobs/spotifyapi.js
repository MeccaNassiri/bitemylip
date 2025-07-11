import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

if (process.argv[1] === import.meta.filename) {
    //this is running from the cron job
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    dotenv.config({ path: `${__dirname}/../.env` , quiet: true});
}

/*const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
        grant_type: 'client_credentials'
    },
    json: true
};

request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        var token = body.access_token;
    }
});*/