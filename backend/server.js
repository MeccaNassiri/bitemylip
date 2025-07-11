import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import express from 'express';

const app = express();

app.get("/", (req, res) => {
    res.send("You shouldn't be hitting this in your browser without going to my website...");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(443, () => {
    console.log("Server is running on port 443");
});