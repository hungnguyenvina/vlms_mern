import React from 'react';
import {Input,Select,Form} from 'element-react';

const UIInput  = (props) => {
    const errorStyle = {
		fontSize: '13px',
        color: '#e91414',
        fontStyle: 'italic',
        marginLeft:'5px'
	};
    //const idLabel = "lblQuestionCategory"+props.label;
    const idLabelError = "lblError"+props.label;
    let errorMessage = "";
    let errorMessageHTML = "";
    if(!props.isValid && props.isDirty) {
        if(props.validation.minLength) {
            errorMessage = `At least ${props.validation.minLength} characters !`;
        }
        else {
            if(props.validation.required) {
                errorMessage = `Field ${props.label} are required !`;
            }
        }
        errorMessageHTML = (<label id={idLabelError} style={errorStyle}>
            {errorMessage}
        </label> )
    }
    let inputElement = null;
    switch(props.elementType) {
        case ('input') :
            inputElement =  
                <Form.Item label={props.label} labelWidth="120">
                    <Input {...props.elementConfig} value={props.value} onChange={props.onChange} className="form-control" />
                </Form.Item>;
            break;
        case ('select') :
            if(props.elementConfig.defaultOption) {
                inputElement = (
                    <Form.Item label={props.label} labelWidth="120">
                        <Select value={props.elementConfig.defaultOption.value} placeholder={props.elementConfig.placeholder}  onChange={props.onChange} name={props.elementConfig.name}>
                            {props.elementConfig.options.map(item => {
                                if(!item.parentName) {
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}`} value={item.value}></Select.Option>
                                    )
                                }
                                else if(item.parentName === '') {
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}`} value={item.value}></Select.Option>
                                    )
                                }
                                else{
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}(in ${item.parentName})`} value={item.value}></Select.Option>
                                    )
                                }
                                
                                }
                            )}
                        </Select>
                    </Form.Item>    
                );
            } 
            else {
                inputElement = (
                    <Form.Item label={props.label} labelWidth="120">
                        <Select value={props.elementConfig.defaultOption.value} placeholder={props.elementConfig.placeholder}  onChange={props.onChange} name={props.elementConfig.name}>
                            {props.elementConfig.options.map(item => {
                                if(!item.parentName) {
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}`} value={item.value}></Select.Option>
                                    )
                                }
                                else if(item.parentName === '') {
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}`} value={item.value}></Select.Option>
                                    )
                                }
                                else{
                                    return (
                                        <Select.Option key={item.value} label={`${item.displayValue}(in ${item.parentName})`} value={item.value}></Select.Option>
                                    )
                                }
                                
                                }
                            )}
                        </Select>
                    </Form.Item>    
                );
            }
            break;
        default:
            inputElement = <Input onChange={props.onChange} {...props.elementConfig} value={props.value} className="form-control" />;
    }

    
    return (
        <div className="form-group">
            {inputElement}
            {errorMessageHTML}
        </div>
    );
}

export default UIInput;