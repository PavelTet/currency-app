const express = require('express');
const request = require('request');

const app = express();

app.use(express.text());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt', (req, res) => {
    request(
        {url: `https://www.cnb.cz/${req.url}`},
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({type: 'error', message: err.message});
            }
            res.send(body.toString());
        }
    )
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
