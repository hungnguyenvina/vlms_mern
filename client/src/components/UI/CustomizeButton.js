import React, {Component} from 'react';
import {ButtonCSS} from '../UI/css/button.css';
class CustomizeButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <a href="#">
                <button 
                    id={this.props.id}
                    className="ctrl-standard is-reversed typ-subhed fx-bubbleDown" 
                    style={{fontSize:'1em'}}
                    onClick={this.props.onClick}
                > 
                    {this.props.text}     
                </button>
            </a>
        );
    }
}

export default CustomizeButton;