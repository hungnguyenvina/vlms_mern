import React from 'react';
import { createCourse } from '../../redux/action/CourseAction';
import { loadCourseCategory} from '../../redux/action/CourseCategoryAction';
import { hoc } from '../hoc/hoc';
import { Redirect } from 'react-router';
import UIInput from '../UI/UIInput';
import { Form, Button } from 'element-react';
import InstructorLayout from './InstructorLayout';
class CreateCourse extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = {
			image:'',
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
			   	}
		   	}   
        };

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
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
		
		const course = {
			title:course_title,
			course_category_id
		};

		this.props.createCourse(course);
        alert('redirecting...');
		this.setState({isRedirect: true});
	}

	onFormSubmit(e){
		alert('on form submit');
      	e.preventDefault();
    }

	onChangeHandler(value,inputIdentifier){
		const updatedCourseForm = {
			...this.state.courseForm
		}
		updatedCourseForm[inputIdentifier].value = value;
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
		for(let key in this.state.courseForm) {
			formElementsArray.push({
				id: key,
				config: this.state.courseForm[key]
			});
		}

		if(this.state.isRedirect) {
			return  <Redirect to="/instructor/manage_courses" /> ;
		}
		let form = (
			<Form onSubmit={this.onSubmitHandler}>
				{formElementsArray.map(formElement => (
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
				)}
		
				<div className="control-group">
            		<label className="control-label"></label>
            		<div className="controls" style={{textAlign : 'left', marginLeft:'20px'}}>
               			{htmlCreateOrUpdateButton}&nbsp;&nbsp;
            		</div>
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

        return (
			<InstructorLayout {...this.props}>
			<div>
				<form id="frmQuestion" name="frmQuestion" className="form-horizontal" method="post" action="create_question">
					<div className="control-group">
						<label className="control-label"></label>
						<div className="controls" >
							<h2 style={styleTitle}>Create your course:</h2>
						</div>
        			</div>
					{form}
				</form>
				
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
	createCourse: (course) => dispatch(createCourse(course)),
	loadCourseCategory:  dispatch(loadCourseCategory()),
});


export default hoc(CreateCourse, mapStateToProps,mapDispatchToProps);