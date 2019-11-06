const jwt = require('jsonwebtoken');
const axios = require('axios')
const tunnel = require('tunnel');

const getFireBaseKeys = async () => {
    const agent = tunnel.httpsOverHttp({
        proxy: {
            host: 'genproxy',
            port: 8080,
        },
    });

    return axios({
        method: 'get',
        httpsAgent: agent,
        url: 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com',
        responseType: 'json'
    }).then(response => {
        return response.data;
    })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('error response data ---------------------------------');
                console.log(error.response.data);
                console.log('error response status ---------------------------------');
                console.log(error.response.status);
                console.log('error response headers ---------------------------------');
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('error request ---------------------------------');
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('error message ---------------------------------');
                console.log('Error', error.message);
            }
            console.log('error config ---------------------------------');
            console.log(error.config);
        })
};

const auth = async (req, res, next) => {

    const result = await getFireBaseKeys();

    const token = req.headers['firebasetoken']
    let decoded;
    let key;

    try {
        decoded = jwt.decode(token, {complete: true, algorithm: 'RS256'});
        key = result[decoded.header['kid']];
    }
    catch(err)
    {
        console.log('---------- TOKEN ERROR START ----------');
        console.log('---------- ERROR ----------');
        console.log(err);
        console.log('---------- TOKEN ERROR END ----------');

        return res.status(401).send({msg: 'You are not authenticated–either not authenticated at all or authenticated incorrectly–but please reauthenticate and try again.'});
    }

    jwt.verify(token, key, {algorithms: ['RS256']}, (err, decoded) => {
        if (err) {
            console.log('---------- TOKEN ERROR START ----------');
            console.log('---------- ERROR ----------');
            console.log(err);
            console.log('---------- TOKEN ----------');
            console.log(jwt.decode(token, {complete: true, algorithm: 'RS256'}));
            console.log('---------- TOKEN ERROR END ----------');

            return res.status(401).send({msg: 'You are not authenticated–either not authenticated at all or authenticated incorrectly–but please reauthenticate and try again.'});
        } else {
            next();
        }
    });
};

module.exports = auth;