let express = require('express');
const timeStampRouter = express.Router();

timeStampRouter.get('/:time', (req, res) => {
    let time = req.params.time;
    let data = {};
    let unixTime;
    let result;

    if (isInteger(time)) {
        unixTime = Number(time);
        result = new Date(time / 1).toUTCString();
    } else {
        result = new Date(time).toUTCString();
        unixTime = Math.floor(new Date(time) / 1);
    }

    data = {"unix": unixTime, "utc": result};
    
    let now = new Date();
    console.log('\x1b[36m%s\x1b[0m', `New request for date ${ time } | Time: ${ now } `);
    res.json(data)
});

// Function to check if value is a integer.
function isInteger(value) {
    return /^\d+$/.test(value);
    }

module.exports = timeStampRouter;

