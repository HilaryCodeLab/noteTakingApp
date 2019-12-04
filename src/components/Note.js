import React, {Component} from 'react';

class Note extends Component{
    render() {
        return(
            //individual filter note
            <li>
                Title: {this.props.title}<span/>
                Description: {this.props.description}
            </li>
        )
    }
}
export default Note;