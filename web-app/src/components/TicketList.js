import React, {Component} from 'react';

import Ticket from './Ticket';
import * as API from '../Api/Api';

class TicketList extends Component{
    state = {
        tickets : [],
        page : 1
    }

    componentWillMount(){
        API.getTicketList(this.state.page)
            .then((resData) => {                
                this.setState({
                    tickets : resData.tickets
                })
            });
    }

    componentWillUpdate(nextProps,nextState){

        console.log(this.state);
        console.log(nextState);
        if(this.state.page != nextState.page){
            API.getTicketList(nextState.page)
            .then((resData) => {                
                this.setState({
                    tickets : resData.tickets
                })
                console.log(resData);
            });
        }
    }


    onPreviousClicked = (event) => {        
        var previousPage = this.state.page - 1;
        this.setState({
            page: previousPage
        });
    };

    onNextClicked = (event) => {      
        var nextPage = this.state.page + 1;
        this.setState({
            page: nextPage
        });          
    };

    render(){

        let rows = [];
        for (var i = 0; i < this.state.tickets.length; i++){
            let rowID = `row${i}`
            rows.push(<Ticket key={rowID} {...this.state.tickets[i]}/>)
        }
        
        return(
            <div className="offset-md-2 col-md-8">      
            <button onClick={(event) => this.onPreviousClicked(event)}>Previous</button> 
            <button onClick={(event) => this.onNextClicked(event)}>Next</button>
                {rows}
            </div>
        )
    }
};

export default TicketList;