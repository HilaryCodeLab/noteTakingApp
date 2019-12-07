import React, {Component} from 'react';

class Note extends Component{
    render() {
        return(
            //individual filter note
            <li>
                Type: &nbsp; {this.props.type} &nbsp;
                Title: &nbsp; {this.props.title}

            </li>
        )
    }
}
export default Note;