var express = require('express');
var router = express.Router();
var axios  = require ('axios');

router.route('/:page')

    // Get All Restaurants
    .get(function(req, res, next) {

        console.log("GET All Restaurants");

        var config = {
            auth: {
                username: 'chaudhari.anuj93@gmail.com',
                password: '123anuj123'
            }
        };

		axios.get('https://anujchaudhari.zendesk.com/api/v2/tickets.json?page='+req.params.page+'&per_page=25', config)
		.then(function (response) {
            console.log(response.data);
            res.status(200).json(response.data);
		})
		.catch(function (error) {
			console.log("This is error calling Composer API");
			res.status(400).json({error: "ZenDesk API is unavailable or the response is invalid."})
		});	

    });

 module.exports = router;
