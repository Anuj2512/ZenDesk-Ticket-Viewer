var axios  = require ('axios');
var ejs = require('ejs');


function singleTicket(req, res){

    var config = {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    };

    axios.get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets/' + req.params.ticketId, config)
    .then(function (response) {
              
        ejs.renderFile('./views/singleTicket.ejs', response.data, function(err,result){
            if (!err) {
                res.status(200).send(result);
            }
            // render or error
            else {                
                res.status(404).send('Page Not Found');                
            }
       });



    })
    .catch(function (error) {        
        res.status(404).send('API not available or Invalid Credential or Invalid Ticket Id Requested.');
    });	
}

 exports.singleTicket = singleTicket;
