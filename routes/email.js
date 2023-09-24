const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/send', (req, res) => {

    let data = req.body;
    console.log(data);
    res.json({
        status: 'success',
        message: 'Data received!'
    });


    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer PK_TEST_KCBBXHKQ12M1BANAHE461Q438Q8E'
        },
        data: JSON.stringify({   // In axios, the 'data' property is used instead of 'body'
            "message": {
                "template": "12m2KXW6hY4JZMZzLNBgpt9RjV8wC5bAfG",
                "to": data['message']['to'],
                "data": data['message']['data']
            }
        }),
        url: 'https://api.courier.com/send'
    };


    axios(options)
    .then(response => console.log(response.data)) // Directly access the data property
    .catch(err => console.error(err));
});

module.exports = router;