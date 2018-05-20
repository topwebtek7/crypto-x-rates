"use strict";

const express = require('express');
const os = require('os');
const CryptoXRates = require('./cryptoXRatesClass')

const app = express();

app.use(express.static('dist'));
const newCryptoXRates = new CryptoXRates();

app.get('/api/cryptoData', (req, res) => {
    newCryptoXRates.rateList()
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(JSON.parse(err)))
});

app.listen(8080, () => console.log('Listening on port 8080!'));
