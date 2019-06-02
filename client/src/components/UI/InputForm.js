import React from 'react';

const InputForm  = (props) => {
    const errorStyle = {
		fontSize: '13px',
        color: '#e91414',
        fontStyle: 'italic',
        marginLeft:'5px'
	};

    let errorMessage = "";
    let errorMessageHTML = "";
    if(!props.isValid && props.isDirty) {
        if(props.validation) {
            if(props.validation.minLength) {
                errorMessage = `At least ${props.validation.minLength} characters !`;
            }
            else {
                if(props.validation.required) {
                    errorMessage = `Field ${props.label} are required !`;
                }
            }
        }
        errorMessageHTML = (<label id={idLabelError} style={errorStyle}>{errorMessage}</label> )
    }
    let inputElement = null;
    switch(props.elementType) {
        case ('input') :
            /*if(props.elementConfig.type == 'file') {
                inputElement = 
                    <form onSubmit={props.onFormSubmit}>
                        <input {...props.elementConfig} value={props.value} onChange={props.onChange} className="form-control" />
                        <button type="submit">Upload</button>
                    </form>;
            }
            else {*/
                inputElement = <input {...props.elementConfig} value={props.value} onChange={props.onChange} className="form-control" />;
            /*}*/
            break;
        case ('select') :
            if(props.elementConfig.defaultOption) {
                inputElement = (
                    <select value={props.value}  onChange={props.onChange} name={props.elementConfig.name}>
                        <option value={props.elementConfig.defaultOption.value}>{props.elementConfig.defaultOption.displayValue}</option>
                        {props.elementConfig.options.map(item =>(
                            <option key={item.value} value={item.value}>{item.displayValue}</option>
                        ))}
                    </select>    
                );
            } 
            else {
                inputElement = (
                    <select value={props.value}  onChange={props.onChange} name={props.elementConfig.name}>
                        {props.elementConfig.options.map(item =>(
                            <option key={item.value} value={item.value}>{item.displayValue}</option>
                        ))}
                    </select>    
                );
            }
            break;
        default:
            inputElement = <input onChange={props.onChange} {...props.elementConfig} value={props.value} className="form-control" />;
    }

    const idLabel = "lblQuestionCategory"+props.label;
    const idLabelError = "lblError"+props.label;
    return (
        <div className="control-group">
            <label className="control-label" htmlFor={idLabel}>{props.label}:</label>
            <div className="controls" style={{textAlign : 'left'}}>
                {inputElement}
                {errorMessageHTML}
            </div>
           
        </div>
    );
}

export default InputForm;