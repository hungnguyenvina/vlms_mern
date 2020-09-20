import React from 'react';
import { getSingleUserInfo,updateUserProfile } from '../../redux/action/UserAction';
import { hoc } from '../hoc/hoc';
import { Redirect } from 'react-router';
import UIInput from '../UI/UIInput';
import { Form, Button, Upload } from 'element-react';
import UserLayout from './UserLayout';
import CKEditor from "react-ckeditor-component";
import {post} from 'axios';
class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);
		this.onChangeCKEditor = this.onChangeCKEditor.bind(this);
        this.state = {
			image:'',
			avatar_url:'',
			isRedirect: false,
		    userForm : {
			   	name: {
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder: 'Enter full name',
						name: 'name'
					},
					label: 'Full name',
					value : '',
					validation: {
						required: true
					},
					valid: true,
					isDirty: false
				   },
				email: {
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder: 'Enter email',
						name: 'email'
					},
					label: 'Email',
					value : '',
					validation: {
						required: true
					},
					valid: true,
					isDirty: false
				},
				avatar: {
					elementType : 'input',
					elementConfig : {
						type : 'file',
						placeholder: 'Enter avatar',
						name: 'avatar'
					},
					label: 'Avatar',
					value : '',
					validation: {
						required: false
					},
					valid: true,
					isDirty: false
			   	},   
		   	}   
        };

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	componentDidMount() {
        //alert('did mount');
		const userID = this.props.user.id;
		const email = this.props.user.email;
		const fullName = this.props.user.name;
		const avatarUrl = this.props.user.avatar_url;
		//alert('userID ID'+userID);
		//alert('email'+email);
		//alert('fullName'+fullName);
		//alert('avatarUrl'+avatarUrl);
		//this.props.getSingleUserInfo(userID);
		
		const updatedUserForm = {
			...this.state.userForm
		}
		updatedUserForm['name'].value = fullName;
		updatedUserForm['email'].value = email;
		updatedUserForm['avatar'].value = avatarUrl;
		this.setState({userForm: updatedUserForm});
	}

	

	onSubmitHandler(event) {
		event.preventDefault();
	    let fullName = this.state.userForm.name.value;
		alert('full name = '+fullName);
		
		let avatar = this.state.userForm.avatar.value;
		alert('avatar = '+avatar);

		const userDataForUpdate = {
			name:fullName,
			avatar_url: avatar
		};

		const userID = this.props.user.id;
		this.props.updateUserProfile(userID,userDataForUpdate);
        //alert('redirecting...');
		//this.setState({isRedirect: true});
	}

	onFormSubmit(e){
		//alert('on form submit');
      	e.preventDefault();
    }

	onChangeHandler(value,inputIdentifier){
		console.log('onChangeHandler...............');
		console.log(value);
		const updatedUserForm = {
			...this.state.userForm
		}
		updatedUserForm[inputIdentifier].value = value;
		updatedUserForm[inputIdentifier].isDirty=true;
		this.setState({userForm: updatedUserForm});
	}
	
	handleRemove = (file, fileList) => {
        //alert('remove from list');
        //console.log(file, fileList);
	}
	
	handleChange = (file, fileList) => {
        //alert('on changexx');
        //console.log(file);
        //console.log(fileList);
        //console.log('file name: '+file.raw.name);
        //console.log(file.raw);
        this.createImage(file.raw);
	}

	createImage(file) {
		//alert('create image');
		let reader = new FileReader();
		reader.onload = (e) => {
		  //console.log('picture result');
		  //console.log(e.target.result);
		  this.setState({image: e.target.result })
		  this.fileUpload(e.target.result,file.name);
		};
		reader.readAsDataURL(file);
	  }

	  fileUpload(image,fileName){
		console.log('file upload');
		console.log(image);
		const url = 'http://localhost:3004/api/upload_file';
        //const formData = {file: image,filename:fileName}
        const formData = {file: image,filename:fileName}
		return  post(url, formData)
				.then(response => {
                        let media = ""; 
                        console.log('file response....'+ response);
                        console.log( response);
					    console.log('file response....'+ this.state.image);
                        let urlResponse = response.data.url;
						alert('urlResponse : '+urlResponse);
						const updatedUserForm = {
							...this.state.userForm
						}
			
						updatedUserForm['avatar'].value = urlResponse;
				})};
	
	onChangeCKEditor(evt){
		let inputIdentifier="";
		console.log('onChangeCKEditor...................');
		console.log(evt);
		let nameOfCKEditor = evt.editor.name;
		//alert('nameOfCKEditor='+nameOfCKEditor);

		var valueOfCKEditor = evt.editor.getData();
		//alert('valueOfCKEditor : '+valueOfCKEditor);
		if(nameOfCKEditor==='editor1') {
			//short description
			inputIdentifier="short_description";
		}
		else if(nameOfCKEditor==='editor2') {
			//full description
			inputIdentifier="full_description";
		}
		else if(nameOfCKEditor==='editor3') {
			//goal
			inputIdentifier="goal";
		}
		else if(nameOfCKEditor==='editor4') {
			//requirement
			inputIdentifier="requirement";
		}
		else if(nameOfCKEditor==='editor5') {
			//skill_level
			inputIdentifier="skill_level";
		}
		else if(nameOfCKEditor==='editor6') {
			//language
			inputIdentifier="language";
		}

		const updatedCourseForm = {
			...this.state.courseForm
		}
		updatedCourseForm[inputIdentifier].value = valueOfCKEditor;
		updatedCourseForm[inputIdentifier].isDirty=true;
		this.setState({courseForm: updatedCourseForm});

		
	}

	

    render() {
		const style1 = {
            width:'16px',
            height:'16px'
        };

		const styleTitle = {
			marginTop:'30px',
			marginBottom:'30px',
			textAlign:'left',
			fontSize:'2em'
		};

		let htmlCreateOrUpdateButton = 
			<Button onClick={ (event) => this.onSubmitHandler(event) } type="primary">Save</Button>
		;
	  
		const formElementsArray = [];
		for(let key in this.state.userForm) {
			formElementsArray.push({
				id: key,
				config: this.state.userForm[key]
			});
		}

		if(this.state.isRedirect) {
			return  <Redirect to="/instructor/manage_course" /> ;
		}
		let form = (
			<Form onSubmit={this.onSubmitHandler}>
				{formElementsArray.map(formElement => {

					if(formElement.config.elementConfig.type==='file')
					{
						return (
							<UIInput key={formElement.id}
								name="myFile"
								label={formElement.config.label}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value} 
								action="http://localhost:3004/api/upload_file/"
								onPreview={file => this.handlePreview(file)}
                           		onRemove={(file, fileList2) => this.handleRemove(file, fileList2)}
                                onChange={(file, fileList2) => this.handleChange(file, fileList2)}
								onFormSubmit={(event) => this.onFormSubmit(event)}
								fileList2={fileList2}
								isValid={formElement.config.valid}
								validation={formElement.config.validation}
								isDirty={formElement.config.isDirty}
							/>
						)
					}
					else if(formElement.config.elementConfig.type==='ckeditor')
					{
						return (
							<UIInput key={formElement.id}
								label={formElement.config.label}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value} 
								content={formElement.config.value}
								onChangeCKEditor={this.onChangeCKEditor}
								onFormSubmit={(event) => this.onFormSubmit(event)}
								isValid={formElement.config.valid}
								validation={formElement.config.validation}
								isDirty={formElement.config.isDirty}
							/>
							
						)
					}
					else{
						return (
							<UIInput key={formElement.id}
								label={formElement.config.label}
								elementType={formElement.config.elementType} 
								elementConfig={formElement.config.elementConfig}
								value={formElement.config.value} 
								onChange={(event) => this.onChangeHandler(event,formElement.id)}
								onFormSubmit={(event) => this.onFormSubmit(event)}
								isValid={formElement.config.valid}
								validation={formElement.config.validation}
								isDirty={formElement.config.isDirty}
							/>
						)
					}
					}
					
				)}
		
			
            		<div style={{textAlign : 'left', marginLeft:'20px'}}>
               			{htmlCreateOrUpdateButton}&nbsp;&nbsp;
            		</div>
			</Form>
		);

       
		
		 const fileList2 = [];
        return (
			<UserLayout {...this.props}>
			<div className='form-section'>
				<h2 style={styleTitle}>Update user's information:</h2>
				{form}
			</div>
			</UserLayout>
        );
    }
}

const mapStateToProps = state => {
	console.log('mapStateToProps........................');
	console.log(state);
	return {
		single_user_detail: state.users.user
	};
}

const mapDispatchToProps = dispatch => ({

	updateUserProfile: (userID,userData) => dispatch(updateUserProfile(userID,userData))
});


export default hoc(UpdateCourse, mapStateToProps,mapDispatchToProps);