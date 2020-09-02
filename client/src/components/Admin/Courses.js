import React from 'react';
import { Button, Loading , Tag, Table, Pagination, Form, Dialog } from 'element-react';
import {loadCourses} from '../../redux/action/CourseAction';
import {hoc} from '../hoc/hoc';
import AdminLayout from './AdminLayout';
import UIInput from '../UI/UIInput';
class Courses extends React.Component {
    constructor(props) {
        super(props);
        let me=this;
        this.state = { 
            dialogVisible: false,
            isUpdated: false,
            selectedCourseID:'',
            selectedCourseName:'',
            loading: true,
            message:'',
            approveCourseForm : {
              approveRejectMessage: {
              elementType : 'input',
              elementConfig : {
                type : 'text',
                placeholder: 'Enter message for instrutor',
                name: 'approveRejectMessage'
              },
              label: 'Message for instructor',
              value : '',
              validation: {
                required: false
              },
              valid: true,
              isDirty: false
              },
              approveRejectStatus : {
                elementType : 'select',
                elementConfig : {
                  name: 'approveRejectStatus',
                  options : [
                    { value : '0', displayValue : 'Approve', parentName:''  },
                    { value : '1', displayValue : 'Reject', parentName:'' }
                  ],
                  defaultOption: {
                    value: '0', displayValue: 'Approve'
                  }
                },
                label: 'Approve/Reject',
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
                  width: 160,
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
                  width: 450,
                  align:'left',
                  render: function(data){
                    return <Tag>{data.title}</Tag>
                  }
                },
                {
                  label: "Fee($)",
                  prop: "fee",
                  width: 60,
                  align:'left',
                  render: function(data){
                    return <Tag>{data.fee}</Tag>
                  }
                },
                {
                  label: "Description",
                  prop: "description",
                  width: 380,
                  align:'left',
                  render: function(data){
                    return <span>{data.description}</span>
                  }
                },
                {
                  label: "Status",
                  prop: "status",
                  width: 120,
                  align:'left',
                  render: function(data){
                    if(data.status===0) {
                      return <Button type="info" size="small" >New</Button>
                    }
                    else if(data.status===1) {
                      return <Button type="warning" size="small" onClick={() => me.approveOrRejectCourse(data,me)}>Pending</Button>
                    }
                    else if(data.status===2) {
                      return <Button type="success" size="small" >Approved</Button>
                    }
                    else if(data.status===3) {
                      return <Button type="danger" size="small" >Rejected</Button>
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
                       
                       <Button type="danger" size="small" onClick={() => me.deleteQuestionCategory(data,me)}>Delete</Button>
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
    }
    
    approveOrRejectCourse = (item,me) => {
      alert(item.id);
      alert(item.title);
      console.log('approveOrRejectCourse..................');
      console.log(item);
      this.setState({ 
        dialogVisible: true,
        isUpdated: true,
        selectedCourseID: item.id,
        selectedCourseName: item.title 
      });
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
      let courses = [];
        if(nextProps.courses && nextProps.courses.length>0)
        {
          this.setState({loading:true});
          nextProps.courses.map(item=>{
            return courses.push({
              'id': item.id,
              'title': item.title,
              'description': item.description,
              'fee': item.fee,
              'course_category_parent_name': item.course_category_parent_name,
              'status': item.status
            });
          })

          this.setState({
            loading: false,
            data: courses
          })
        }
        else {
          this.setState({
            loading: false,
            data: []
          })
        }
    }

    deleteQuestionCategory = (item,me) => {
      this.props.deleteQuestionCategory(item.id);
    }

    onSubmitHandler(event) {
      event.preventDefault();
      const messageForInstructor = this.state.approveCourseForm['approveRejectMessage'].value;
      const approveOrReject = this.state.approveCourseForm['approveRejectStatus'].value;
      alert('messageForInstructor:'+messageForInstructor);
      alert('approveOrReject:'+approveOrReject);
    }

    onChangeHandler(value,inputIdentifier){
      //alert('value: '+value);
      //alert('inputIdentifier : '+inputIdentifier)
      const updatedApproveCourseForm = {
        ...this.state.approveCourseForm
      }
      
      const updatedApproveCourseElement = {
        ...updatedApproveCourseForm[inputIdentifier]
      }
  
      updatedApproveCourseElement.value = value;
      updatedApproveCourseForm[inputIdentifier] = updatedApproveCourseElement;

      console.log('updatedApproveCourseForm...................');
      console.log(updatedApproveCourseForm);

      this.setState({approveCourseForm: updatedApproveCourseForm});
    }

    render() { 

      let courses = [...this.state.data];
      if(this.state.data.length>0) {
        courses = this.getPaginationData(this.state.currentPage,courses);
      }

      const formElementsArray = [];
      for(let key in this.state.questionCategoryForm) {
        formElementsArray.push({
          id: key,
          config: this.state.questionCategoryForm[key]
        });
      }

      const approveFormElementsArray = [];
      for(let key in this.state.approveCourseForm) {
        approveFormElementsArray.push({
          id: key,
          config: this.state.approveCourseForm[key]
        });
      }

      let form = (
        <Form >
          {approveFormElementsArray.map(formElement => (
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

        return ( 
          <AdminLayout {...this.props}>
            <React.Fragment>
                <h3 style={{display:'inline-block', marginLeft: '10px', marginBottom:'20px'}}>Courses</h3>
                <Dialog
                  title={this.state.selectedCourseName}
                  visible={ this.state.dialogVisible }
                  onCancel={ () => this.setState({ dialogVisible: false }) }
                >
                  <Dialog.Body>
                    
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
                    data={courses}
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
  console.log(state.courses);
	return {
		courses : state.courses.courses
	};
}

const mapDispatchToProps = dispatch => ({
  loadCourses:  dispatch(loadCourses())
});

export default hoc(Courses, mapStateToProps,mapDispatchToProps);