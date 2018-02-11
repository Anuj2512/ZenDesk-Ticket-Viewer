import React, {Component} from 'react';
import * as API from '../Api/Api';

class Ticket extends Component{
    state = {
    }


    render(){
        var id = "collapse" + this.props.id;
        var idWithHash = "#" + id;
        var tags = "";
        for(var i=0; i < this.props.tags.length; i++)
            tags += "#" + this.props.tags[i] + " "

        return(
            <div className="shortUrlInfo row">   
        
                <div className="col-md-10"> 
                    <div><span className="subjectName"> Ticket Id:  </span> {this.props.id} </div>                            
                    <div><span className="subjectName"> Subject:    </span> {this.props.subject}</div>                
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={idWithHash} aria-expanded="false" aria-controls={id}>View</button>
                </div>
                    
                <div className="collapse moreInfoBox" id={id}>
                    <div className="card card-body">
                        <div className="row infoBox"><div className="col-md-2 subjectName"> Description:    </div> <div className="col-md-10"> {this.props.description} </div> </div>
                        <div className="row infoBox"><div className="col-md-2 subjectName"> Status:         </div> <div className="col-md-10"> {this.props.status} </div> </div>
                        <div className="row infoBox"><div className="col-md-2 subjectName"> Created At:     </div> <div className="col-md-10"> {this.props.created_at} </div> </div>
                        <div className="row infoBox"><div className="col-md-2 subjectName"> Tags:           </div> <div className="col-md-10"> {tags} </div> </div>                        
                    </div>
                </div>

            </div>
        )
    }
};

export default Ticket;