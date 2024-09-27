import 'dotenv/config'

import bodyParser from "body-parser";
import express from "express";

import router from './api/routes/router.js'

const app = express();
const port = process.env.PORT ?? 3000;

// Serving static files from folder 'files'
app.use(express.static('./files'));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Include the routes
app.use('/api', router);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});

