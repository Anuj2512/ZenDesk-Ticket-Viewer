import React, {Component} from 'react';

import Ticket from './Ticket';
import * as API from '../Api/Api';

class TicketList extends Component{
    state = {
        tickets : [],
        page : 1,
        totalTickets : 0,
        bNextPage : "",
        bPrevPage: "disabled",
        error: "",
        bLoadNext : false,
        bLoadPrev : false
    }

    getTicketList(page){
        API.getTicketList(page)
            .then((resData) => {       
                console.log(resData);

                this.state.bLoadPrev = false;
                this.state.bLoadNext = false;

                if(resData.error){
                    this.setState({
                        error: resData.error
                    })
                    return;
                }

                let totalPages = Math.ceil(resData.count / 25);                

                this.setState({
                    tickets : resData.tickets,
                    totalTickets: resData.count,
                    bNextPage: (this.state.page !== totalPages ? "" : "disabled"),
                    bPrevPage: (this.state.page !== 1 ? "" : "disabled"),
                    error: null,
                    bLoadPrev: false,
                    bLoadNext: false
                })

            });
    }

    componentWillMount(){
        this.getTicketList(this.state.page);
    }

    componentWillUpdate(nextProps,nextState){
        if(this.state.page !== nextState.page){
            this.getTicketList(nextState.page);
        }
    }

    onPreviousClicked = (event) => {        
        this.setState({
            page: this.state.page - 1,
            bNextPage: "disabled",
            bPrevPage: "disabled",
            bLoadPrev: true
        });        
    };

    onNextClicked = (event) => {              
        this.setState({
            page: this.state.page + 1,
            bNextPage: "disabled",
            bPrevPage: "disabled",
            bLoadNext: true
        });                  
    };

    render(){

        if(this.state.error !== null){
            return(
                <div className="App-header">
                    <div>{this.state.error}</div>
                </div>
            )
        }

        let rows = [];
        for (var i = 0; i < this.state.tickets.length; i++){
            let rowID = `row${i}`
            rows.push(<Ticket key={rowID} {...this.state.tickets[i]}/>)
        }
        let startId = this.state.tickets[0] ? this.state.tickets[0].id : 0;
        let endId = this.state.tickets[this.state.tickets.length-1] ? this.state.tickets[this.state.tickets.length-1].id : 0;
        
        console.log("Prev:", this.state.bLoadPrev);
        console.log("Next:", this.state.bLoadNext);

        return(
            <div className="offset-md-2 col-md-8">    
            <div className="row infoBox">  
                <div className="col-md-2 text-center">
                    <button className="button btn-primary navigation-button" disabled={this.state.bPrevPage} onClick={(event) => this.onPreviousClicked(event)}> {this.state.bLoadPrev ? <i className='fa fa-circle-o-notch fa-spin'></i> : ""} Previous</button>
                </div>
                <div className="col-md-8 text-center subjectName"> Showing {startId} - {endId} of {this.state.totalTickets} Tickets</div>
                <div className="col-md-2 text-center">
                    <button className="button btn-primary navigation-button" disabled={this.state.bNextPage} onClick={(event) => this.onNextClicked(event)}> {this.state.bLoadNext ? <i className='fa fa-circle-o-notch fa-spin'></i> : ""} Next</button>
                </div>
            </div>
                {rows}
            </div>
        )
    }
};

export default TicketList;