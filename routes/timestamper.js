let express = require('express');
const timeStampRouter = express.Router();

// Return current date if no parameter was given
timeStampRouter.get('/', (req, res) => {
    const utc = new Date().toUTCString();
    const unixTime = Math.floor(new Date(utc) / 1);

    const data = {"unix": unixTime, "utc": utc}

    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `New request for date now | Time: ${ now } `);
    res.json(data);
});

// Stamper route that takes in a unix date or yyyy-mm-dd
timeStampRouter.get('/:time', (req, res) => {
    // Fetches time from url.
    let time = req.params.time;
    let data = {};
    let unixTime;
    let result;

    // Validation checks
    if(isInteger(time)){
        unixTime = Number(time);
        result = new Date(time / 1).toUTCString();
        data = {"unix": unixTime, "utc": result};
    } else if (isDate(time)) {
        result = new Date(time).toUTCString();
        unixTime = Math.floor(new Date(time) / 1);
        data = {"unix": unixTime, "utc": result};
    } else {
        data = {"error" : "Invalid Date"}
    }
    
    // Simple logging
    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `New request for date ${ time } | Time: ${ now } `);
    res.json(data)
});

// Function to check if value is a integer.
function isInteger(value) {
    return /^\d+$/.test(value);
}

// Function to check if value is a Date.
function isDate(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = timeStampRouter;

