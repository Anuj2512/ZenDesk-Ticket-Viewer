import React, {Component} from 'react';
// import * as API from '../Api/Api';

import Ticket from './Ticket';
import * as API from '../Api/Api';

class TicketList extends Component{
    state = {
        tickets : [],
        page : 1
    }

    componentWillMount(){

        var url = this.props.location.pathname;
        console.log(url.substr(url.lastIndexOf('/') + 1));
        var page = url.substr(url.lastIndexOf('/') + 1);
        this.setState({
            page: page 
        })

        API.getTicketList(page)
            .then((resData) => {
                
                this.setState({
                    tickets : resData.tickets
                })
                console.log(resData);
            });
    }

    render(){

        console.log(this.state.shortenedURL)

        let rows = [];
        for (var i = 0; i < this.state.tickets.length; i++){
            let rowID = `row${i}`
            rows.push(<Ticket key={rowID} {...this.state.tickets[i]}/>)
        }
        
        return(
            <div>                
                {rows}
            </div>
        )
    }
};

export default TicketList;