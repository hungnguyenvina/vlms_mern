import React from 'react';
import { loadSingleCourse,updateCourseInfo } from '../../redux/action/CourseAction';
import { loadCourseCategory} from '../../redux/action/CourseCategoryAction';
import { hoc } from '../hoc/hoc';
import { Redirect } from 'react-router';
import UIInput from '../UI/UIInput';
import { Form, Button, Upload } from 'element-react';
import InstructorLayout from './InstructorLayout';
import CreateUpdateCourse from './CreateUpdateCourse.css';
import {post} from 'axios';
class UpdateCourse extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = {
			image:'',
			course_logo_url:'',
			isRedirect: false,
		    courseForm : {
			   	title: {
					elementType : 'input',
					elementConfig : {
						type : 'text',
						placeholder: 'Enter course name',
						name: 'title'
					},
					label: 'Course\'s name',
					value : '',
					validation: {
						required: true
					},
					valid: true,
					isDirty: false
			   	},
				course_category_id : {
					elementType : 'select',
					elementConfig : {
						name: 'course_category_id',
						options : [
							{ value : '0', displayValue : 'Enable'  },
							{ value : '1', displayValue : 'Disable' }
						],
						defaultOption: {
							value: '0', displayValue: 'Select category'
						}
					},
					label: 'Category',
					value : '1',
					validation: {
						required: false
					},
					valid: true,
					isDirty: false
				},
				course_logo: {
					elementType : 'input',
					elementConfig : {
						type : 'file',
						placeholder: 'Enter course name',
						name: 'course_logo'
					},
					label: 'Course\'s logo',
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
        const courseID = this.props.match.params.id;
	    this.props.loadSingleCourse(courseID);
	}

	loadCourseCategoryIntoArray() {
		let finalArray=[] ;
		finalArray.push({value:"0", displayValue : "Select parent", parentName: ""});
  
		this.props.course_categories.map((option,index) => {
		  return finalArray.push({value: option._id, displayValue : option.name, parentName: option.course_category_parent_name});
		});
  
		return finalArray;
	  }

	onSubmitHandler(event) {
		event.preventDefault();
	    let course_title = this.state.courseForm.title.value;
		alert('course name = '+course_title);

		let course_category_id = this.state.courseForm.course_category_id.value;
		alert('course_category_id = '+course_category_id);
		
		let course_picture_url = this.state.courseForm.course_logo.value;
		alert('course_logo = '+course_picture_url);

		const courseDataForUpdate = {
			title:course_title,
			course_category_id,
			course_picture_url
		};

		const courseID = this.props.match.params.id;
		this.props.updateCourseInfo(courseID,courseDataForUpdate);
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
		const updatedCourseForm = {
			...this.state.courseForm
		}
		updatedCourseForm[inputIdentifier].value = value;
		updatedCourseForm[inputIdentifier].isDirty=true;
		this.setState({courseForm: updatedCourseForm});
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
						let currentState = {...this.state};
						let courseFormSate = {...currentState.courseForm};
						let courseLogoState = {
							...courseFormSate.course_logo,
							value: urlResponse
						}
						courseFormSate.course_logo = courseLogoState;
						currentState.courseForm.course_logo = courseLogoState;
						this.setState({
							courseForm: courseFormSate,
							course_logo_url: urlResponse
						});
				})};

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
		for(let key in this.state.courseForm) {
			formElementsArray.push({
				id: key,
				config: this.state.courseForm[key]
			});
		}

		if(this.state.isRedirect) {
			return  <Redirect to="/instructor/manage_course" /> ;
		}
		let form = (
			<Form onSubmit={this.onSubmitHandler}>
				{formElementsArray.map(formElement => {
					console.log('formElement');
					console.log(formElement);
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

        if(this.props.course_categories && this.props.course_categories.length>0) {

			const updatedCreateCourseStep1Form = {
				...this.state.courseForm
			}

			const courseCategoryElement = {
				...updatedCreateCourseStep1Form.course_category_id
			}
			
			courseCategoryElement.elementConfig.options = this.loadCourseCategoryIntoArray();
			courseCategoryElement.value="0";

 	    }
		
		 const fileList2 = [];
        return (
			<InstructorLayout {...this.props}>
			<div className='form-section'>
				<h2 style={styleTitle}>Update course:</h2>
				{form}
			</div>
			</InstructorLayout>
        );
    }
}

const mapStateToProps = state => {
	return {
		course_categories : state.course_categories
	};
}

const mapDispatchToProps = dispatch => ({
	loadSingleCourse: (courseID) => dispatch(loadSingleCourse(courseID)),
	updateCourseInfo: (courseID,courseData) => dispatch(updateCourseInfo(courseID,courseData)),
	loadCourseCategory:  dispatch(loadCourseCategory()),
});


export default hoc(UpdateCourse, mapStateToProps,mapDispatchToProps);