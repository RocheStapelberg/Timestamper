let express = require('express');
const timeStampRouter = express.Router();

// Stamper route that takes in a unix date or yyyy-mm-dd
timeStampRouter.get('/:time', (req, res) => {
    // Fetches time from url.
    let time = req.params.time;
    let data = {};
    let unixTime;
    let result;

    // Check if time is in unix format which is an integer.
    if (isInteger(time)) {
        unixTime = Number(time);
        result = new Date(time / 1).toUTCString();
    } else {
        result = new Date(time).toUTCString();
        unixTime = Math.floor(new Date(time) / 1);
    }

    // Creates JSON object from data.
    data = {"unix": unixTime, "utc": result};
    
    // Simple logging
    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `New request for date ${ time } | Time: ${ now } `);
    res.json(data)
});

// Function to check if value is a integer.
function isInteger(value) {
    return /^\d+$/.test(value);
    }

module.exports = timeStampRouter;

