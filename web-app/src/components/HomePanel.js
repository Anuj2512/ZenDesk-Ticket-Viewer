import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
// import * as API from '../Api/Api';

import TicketList from './TicketList';

class HomePanel extends Component {

    state = {  
    };

    onLoadTickets = (event) => {        
        this.props.history.push("/tickets/1");
    };

    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={(props) => (
                    <div>
                        <TicketList {...props}/>
                    </div>
                )}/>

            </div>
        );
    }
}

export default withRouter(HomePanel);