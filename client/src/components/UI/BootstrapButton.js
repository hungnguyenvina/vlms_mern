import React, {Component} from 'react';

class BootstrapButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styleFloatLeft = {
			float:'left'
		};

        return (
            <input type="button" id={this.props.id} style={styleFloatLeft} onClick={this.props.openModal} name="btnShowCreateCategoryQuestion" id="btnShowCreateCategoryQuestion" className={"btn btn-" + this.props.buttonStyle} value={this.props.buttonText} />
        );
    }
}

export default BootstrapButton;