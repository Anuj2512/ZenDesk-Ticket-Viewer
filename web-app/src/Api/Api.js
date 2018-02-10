const CP_SERVER_URL = 'http://localhost:3002' 

export const getTicketList = (payload) =>

    fetch(`${CP_SERVER_URL}/tickets/${payload}`, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(error => {
            console.log("This is error ");
            return error;
    });

