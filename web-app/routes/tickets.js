var axios  = require ('axios');
var ejs = require('ejs');


function tickets(req, res){

    console.log(req.params.pageNo);

    if(req.params.pageNo === undefined)
        req.params.pageNo = 1;

    var config = {
        auth: {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }
    };

    axios.get('https://' + process.env.SUBDOMAIN + '.zendesk.com/api/v2/tickets.json?page='+req.params.pageNo+'&per_page=25', config)
    .then(function (response) {
        
        var lastPage = Math.ceil(response.data.count / 25);        
        response.data.pageNo = req.params.pageNo;
        response.data.bPrevious = (req.params.pageNo > 1 ? "" : "disabled");
        response.data.bNext = (req.params.pageNo < lastPage ? "" : "disabled");        

        ejs.renderFile('./views/tickets.ejs', response.data, function(err,result){
            if (!err) {
                res.status(200).send(result);
            }
            // render or error
            else {
                res.status(404).send('Page Not Found');
                console.log(err);
            }
       });

    })
    .catch(function (error) {        
        res.status(404).send('API not available or invalid page requested.');
    });	
}

 exports.tickets = tickets;
