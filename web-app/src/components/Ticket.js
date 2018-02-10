import React, {Component} from 'react';
import * as API from '../Api/Api';

class Ticket extends Component{
    state = {
    }


    render(){

        console.log(this.props);

        return(
            <div>
                <div>{this.props.subject}</div>
            </div>
        )
    }
};

export default Ticket;