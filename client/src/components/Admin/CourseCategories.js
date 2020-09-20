import React from 'react';
import { Button, Alert, Loading , Tag, Table, Pagination, Dialog, Form } from 'element-react';
import {loadCourseCategory,deleteCourseCategory,createCourseCategory,updateCourseCategory} from '../../redux/action/CourseCategoryAction';
import {hoc} from '../hoc/hoc';
import UIInput from '../UI/UIInput';
import AdminLayout from './AdminLayout';

class CourseCategories extends React.Component {
    constructor(props) {
        super(props);
        let me=this;
        this.state = { 
            isValidForm:false,
            loading: true,
            message:'x',
            selectedParentCourseID:'',
            courseCategory: {
              name:'',
              description: '',
              course_category_parent_id: '1',
              status: '0'
            },
            courseCategoryForm : {
              name: {
              elementType : 'input',
              elementConfig : {
                type : 'text',
                placeholder: 'Enter name of course category',
                name: 'name'
              },
              label: 'Name',
              value : '',
              validation: {
                required: true,
                minLength: 3
              },
              valid: true,
              isDirty: false
              },
              description: {
              elementType : 'input',
              elementConfig : {
                type : 'text',
                placeholder: 'Enter description of course category',
                name: 'description'
              },
              label: 'Description',
              value : '',
              validation: {
                required: false
              },
              valid: true,
              isDirty: false
              },
              courseCategoryParent : {
                elementType : 'select',
                elementConfig : {
                  name: 'course_category_parent_id',
                  options : [
                    { value : '0', displayValue : 'Enable', parentName:''  },
                    { value : '1', displayValue : 'Disable', parentName:'' }
                  ],
                  defaultOption: {
                    value: '0', displayValue: 'Select category11111'
                  }
                },
                label: 'Belongs to',
                value : '1',
                validation: {
                  required: false
                },
                valid: true,
                isDirty: false
              },
              status : {
              elementType : 'select',
              elementConfig : {
                name: 'status',
                options : [
                  { value : '0', displayValue : 'Enable', parentName:''  },
                  { value : '1', displayValue : 'Disable', parentName:'' }
                ],
                defaultOption: {
                  value: '0', displayValue: 'Select status'
                }
              },
              label: 'Status',
              value : '0',
              validation: {
                required: false
              },
              valid: true,
              isDirty: false
              }
            },
            columns: [
                {
                  type: 'index'
                },
                {
                  label: "Category",
                  prop: "category_parent_name",
                  align:'left',
                  width: 230,
                  render: function(data){
                    return (
                    <span>
                      <span style={{marginLeft: '10px',textAlign:'left'}}>{data.course_category_parent_name}</span>
                    </span>)
                  }
                },
                {
                  label: "Name",
                  prop: "name",
                  width: 230,
                  align:'left',
                  render: function(data){
                    return <Tag>{data.name}</Tag>
                  }
                },
                {
                  label: "Description",
                  prop: "description",
                  width: 280,
                  align:'left',
                  render: function(data){
                    return <span>{data.description}</span>
                  }
                },
                {
                  label: "Status",
                  prop: "status",
                  width: 80,
                  align:'left',
                  render: function(data){
                    if(data.status===0) {
                      return <Button type="info" size="small">Enable</Button>
                    }
                    else {
                      return <Button type="danger" size="small">Disable</Button>
                    }
                  }
                },
                {
                  label: "Operations",
                  render: function(data) {
                    return (
                      <span>
                       <Button plain={true} type="info" size="small" onClick={() => me.editCourseCategory(data,me)}>Edit</Button>
                       <Button type="danger" size="small" onClick={() => me.deleteCourseCategory(data,me)}>Delete</Button>
                      </span>
                    )
                  }
                }
              ],
              currentPage: 1,
              noOfItemsPerPage: 5,
              data: [],
              dialogVisible: false,
              isUpdated: false,
              form: {
                name: '',
                region: ''
              }
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    checkValidity(value, rules) {
      let isValid = true;
      
      if(rules.required) {
        isValid = value.trim() !== '' && isValid;
      }
  
      if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }
  
      if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
      return isValid;
    }

    onSubmitHandler(event) {
      event.preventDefault();
      var categoryCourseParentID = this.state.courseCategory.course_category_parent_id;
      const courseCategory = {
        name : this.state.courseCategory.name,
        description : this.state.courseCategory.description,
        course_category_parent_id: categoryCourseParentID,
        status : this.state.courseCategory.status
      }

      const updatedCourseCategoryForm = {
        ...this.state.courseCategoryForm
      }
      //courseCategoryName input
      const courseCategoryNameElement = {
        ...updatedCourseCategoryForm.name
      }
      courseCategoryNameElement.value= "";//this.state.courseCategory.name;
    
      const isValidCourseCategoryName = this.checkValidity(this.state.courseCategoryForm.name.value, this.state.courseCategoryForm.name.validation);
      courseCategoryNameElement.valid = isValidCourseCategoryName;

      let isValidForm = true;
      let finalMessage = "";
      if(!isValidCourseCategoryName) {
        isValidForm=false;
        finalMessage = "Name must not be left blank!";
      }

      if(!isValidForm) {
        this.setState({
          isValidForm:false,
          message: finalMessage
        });
      } 
      else {
        if(this.state.isUpdated) {
          this.props.updateCourseCategory(this.state.selectedCourseCategoryID,courseCategory);
        }
        else {
          this.props.createCourseCategory(courseCategory);
        }

        this.setState({ 
          isValidForm:true,
          message: '',
          dialogVisible: false 
        });
      }
    }

    onCurrentChange = (currentPage) => {
      this.setState({
        currentPage: currentPage
      });
    }

    getPaginationData(currentPage,data) {
      const startIndex = (currentPage-1) * this.state.noOfItemsPerPage;
      const endIndex = startIndex + this.state.noOfItemsPerPage;
      data = data.slice(startIndex,endIndex);
      return  data;
    }

    componentWillReceiveProps(nextProps) {
      let course_categories = [];
        if(nextProps.course_categories && nextProps.course_categories.length>0)
        {
          this.setState({loading: true});
          nextProps.course_categories.map(item=>{
            return course_categories.push({
              'id': item._id,
              'course_category_parent_id': item.course_category_parent_id,
              'course_category_parent_name': item.course_category_parent_name,
              'name': item.name,
              'description': item.description,
              'status': item.status
            });
          })

          this.setState({
            loading: false,
            data: course_categories
          })
        }
        else {
          this.setState({
            loading: false,
            data: []
          })
        }
    }

    openDialog = () => {
      const courseCategory = {
        name : '',
        description : '',
        course_category_parent_id: '0',
        status: '0'
      }
      this.setState({isUpdated : false, courseCategory : courseCategory});

      const updatedCourseCategoryForm = {
        ...this.state.courseCategoryForm
      }
  
      //courseCategoryStatus select 
      const courseCategoryStatusElement = {
        ...updatedCourseCategoryForm.status
      }
      courseCategoryStatusElement.value = "0";
  
      //courseCategoryParent select 
      const courseCategoryParentElement = {
        ...updatedCourseCategoryForm.courseCategoryParent
      }
      courseCategoryParentElement.elementConfig.options = this.loadCourseCategoryIntoArray();
      let selectedItem = "";
      //let newCourseCategory = {
      //  ...courseCategory
      //}
      for(var j=0;j<this.props.course_categories.length;j++) {
        if(j===0) {
          //selectedItem = this.props.course_categories[j]._id + "_" + this.props.course_categories[j].name;
          //newCourseCategory = {
          //  ...courseCategory,
          //  course_category_parent_id: this.props.course_categories[j]._id,
          //  course_category_parent_name: this.props.course_categories[j].name
          //}
        }
      }

      selectedItem = "0"
      /*let newCourseCategory = {
        ...courseCategory,
        course_category_parent_id: "",
        course_category_parent_name: ""
      }*/

      courseCategoryParentElement.elementConfig.defaultOption.value = selectedItem;
      courseCategoryParentElement.value="0";

      //courseCategoryName input
      const courseCategoryNameElement = {
        ...updatedCourseCategoryForm.name
      }
      courseCategoryNameElement.value= "";//this.state.courseCategory.name;
    
      const isValidFormElement = this.checkValidity(courseCategoryNameElement.value, courseCategoryNameElement.validation);
      courseCategoryNameElement.valid = isValidFormElement;
      
      /*if(!isValidFormElement) {
        this.setState({
          isValidForm:false,
          courseCategory : newCourseCategory,
          message: 'Please fill in all required field!'
        });
      }
      else {
        this.setState({
          isValidForm:true,
          courseCategory : newCourseCategory
        });
      }*/

      if(this.state.dialogVisible === false) {
        this.setState({dialogVisible: true, courseCategoryForm: updatedCourseCategoryForm});
      }
    }

    deleteCourseCategory = (item,me) => {
      this.props.deleteCourseCategory(item.id);
    }

    editCourseCategory = (item,me) => {
      this.setState({ 
        dialogVisible: true,
        isUpdated: true,
        selectedCourseCategoryID: item.id ,
        selectedStatus: item.status
      });
      
      const state = {...me.state.courseCategory};
      state['name'] = item.name;
      state['description'] = item.description;
      state['status'] = item.status;
      var categoryCourseParentID =item.category_course_parent_id;//this.state.courseCategory.category_course_parent_id;

      const newState = {...me.state.courseCategoryForm};
      newState.courseCategoryParent.elementConfig.options = me.loadCourseCategoryIntoArray();
      
      let selectedItem = item.id + "_" + item.name;
      let isFound="0";
      for(var j=0;j<this.props.course_categories.length;j++) {
        if(item.course_category_parent_id===this.props.course_categories[j]._id) {
          var selectedCourseCategoryParentID = this.props.course_categories[j]._id;
          selectedItem = selectedCourseCategoryParentID;
          isFound="1";
        }
      }

      if(isFound==="0") {
        selectedItem = "0";
        state['course_category_parent_id'] =  "" ;
        state['course_category_parent_name'] = "";
      }
      else {
        state['course_category_parent_id'] =  item.id ;
        state['course_category_parent_name'] = item.name;
      }
      
      newState.courseCategoryParent.elementConfig.defaultOption.value = selectedItem;
      newState.name.value = item.name;
      //newState.name.valid = this.checkValidity(newState.name.value, newState.name.validation);
  
      newState.description.value=item.description;
      newState.status.elementConfig.defaultOption.value    = ""+item.status;//this.state.courseCategory.status;
      //newState.courseCategoryParent.value= this.state.courseCategory.category_course_parent_id;
      //this.setState({courseCategoryForm:newState});
      //const newState = this.state.courseCategoryForm
      newState.courseCategoryParent.value= categoryCourseParentID;
      
      this.setState({
        courseCategory:state, 
        courseCategoryForm:newState
      });
    }

    loadCourseCategoryIntoArray() {
      let finalArray=[] ;
      finalArray.push({value:"0", displayValue : "Select parent", parentName: ""});

      this.props.course_categories.map((option,index) => {
        return finalArray.push({value: option._id, displayValue : option.name, parentName: option.course_category_parent_name});
      });

      return finalArray;
    }

    onChangeHandler(value,inputIdentifier){
      const state = this.state.courseCategory;
      state[inputIdentifier] = value;
     
      if(inputIdentifier === "courseCategoryParent") {
        state['course_category_parent_id'] = value;
      }
      
      this.setState({courseCategory : state});

      const updatedCourseCategoryForm = {
        ...this.state.courseCategoryForm
      }
  
      const updatedCourseCategoryElement = {
        ...updatedCourseCategoryForm[inputIdentifier]
      }
  
      updatedCourseCategoryElement.value = value;
      //const isValidFormElement = this.checkValidity(updatedCourseCategoryElement.value, updatedCourseCategoryElement.validation);
      //updatedCourseCategoryElement.valid = isValidFormElement;
      //updatedCourseCategoryElement.isDirty=true;
      //if(!isValidFormElement) {
      //  this.setState({isValidForm:false});
      //}
      //else {
      //  this.setState({isValidForm:true});
      //}
  
      updatedCourseCategoryForm[inputIdentifier] = updatedCourseCategoryElement;
      this.setState({courseCategoryForm: updatedCourseCategoryForm});
    }

    render() { 
      let course_categories = [...this.state.data];
      if(this.state.data.length>0) {
        course_categories = this.getPaginationData(this.state.currentPage,course_categories);
      }

      const formElementsArray = [];
      for(let key in this.state.courseCategoryForm) {
        formElementsArray.push({
          id: key,
          config: this.state.courseCategoryForm[key]
        });
      }

      let form = (
        <Form >
          {formElementsArray.map(formElement => (
              <UIInput key={formElement.id}
                label={formElement.config.label}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                onChange={(event) => this.onChangeHandler(event,formElement.id)}
                isValid={formElement.config.valid}
                validation={formElement.config.validation}
                isDirty={formElement.config.isDirty}
              />
            )
          )}
        </Form>
      );
      
      let alert = "";
      if(!this.state.isValidForm && this.state.message !=="") {
        alert =  <Alert style={{marginBottom:'20px'}} title={this.state.message} type="error" />
      }
        return ( 
          <AdminLayout {...this.props}>
            <React.Fragment>
                <h3 style={{display:'inline-block', marginLeft: '10px', marginBottom:'20px'}}>Course categories</h3>
                <div style={{display:'block', textAlign: 'left', marginLeft: '10px', marginBottom:'10px'}}>
                  <Button onClick={ () => this.openDialog() } type="primary">Create new category</Button>
                </div>
                <Dialog
                  title="Create a new course category"
                  visible={ this.state.dialogVisible }
                  onCancel={ () => this.setState({ dialogVisible: false }) }
                >
                  <Dialog.Body>
                    {alert}
                    {form}
                  </Dialog.Body>

                  <Dialog.Footer className="dialog-footer">
                    <Button onClick={ (event) => this.onSubmitHandler(event) }>Save</Button>
                    <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>Close</Button>
                  </Dialog.Footer>
                </Dialog>
                <Loading loading={this.state.loading}>
                <Table
                    style={{width: '95%', marginLeft: '10px', marginBottom:'20px'}}
                    columns={this.state.columns}
                    data={course_categories}
                    border={true}
                    highlightCurrentRow={true}
                    onCurrentChange={item=>{console.log(item)}}
                />
                </Loading>
                <div className="first">
                  <div className="block">
                    <Pagination pageSize={this.state.noOfItemsPerPage} onCurrentChange={this.onCurrentChange} layout="prev, pager, next" total={this.state.data.length}/>
                  </div>
                </div>
                
            </React.Fragment>
            </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
  //console.log(state.course_categories);
	return {
		course_categories : state.course_categories
	};
}

const mapDispatchToProps = dispatch => ({
  loadCourseCategory:  dispatch(loadCourseCategory()),
  deleteCourseCategory: (courseCategoryID) => dispatch(deleteCourseCategory(courseCategoryID)),
  createCourseCategory: (courseCategory) => dispatch(createCourseCategory(courseCategory)),
  updateCourseCategory: (id,courseCategory) => dispatch(updateCourseCategory(id,courseCategory))
});

export default hoc(CourseCategories, mapStateToProps,mapDispatchToProps);