let express = require('express');
let app = express();

// Setup for env and assets
require('dotenv').config();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST;

assetPath = __dirname + "/Public";

app.use("/public", express.static(assetPath));
app.use(express.json());

const timeStampRouter = require('./routes/timestamper');

// Serving front-page
app.get('/', (req, res) => {
    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `Main page was requested | Time: ${now} `);
    res.sendFile(__dirname + '/views/index.html')
});

app.use('/api', timeStampRouter)

app.listen(PORT, HOST, () => {
    console.log(`Listening on http://${HOST}:${PORT}`);
});

