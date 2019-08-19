const express = require('express');
const winstonLogger = require('./middleware/winstonLogger');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('./startup/logging.startup')();
require('./startup/mongoose.startup')();
require('./startup/config.startup')();
require('./startup/routes.startup')(app);

const port = process.env.PORT || 4000;
const domain = window.location.hostname;

const corsOptions = {
    origin: [
      "http://" + domain + ":3000",
      "https://" + domain + ":3000",
      "http://" + domain,
      "https://" + domain,
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.get('/new', (req, res) => {
    res.send('cors test');
});

// Starting server 
const server = app.listen(port, () => {
    winstonLogger.info(`Started server on port ${port}`);
});

module.exports = server;
