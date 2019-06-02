import React from 'react';
import { Button, Alert, Loading , Tag, Table, Pagination, Dialog, Form } from 'element-react';
import {loadQuestionCategory,deleteQuestionCategory,createQuestionCategory,updateQuestionCategory} from '../../redux/action/QuestionCategoryAction';
import {hoc} from '../hoc/hoc';
import UIInput from '../UI/UIInput';
import AdminLayout from './AdminLayout';

class QuestionCategories extends React.Component {
    constructor(props) {
        super(props);
        let me=this;
        this.state = { 
            loading: true,
            isValidForm:false,
            message:'',
            selectedParentQuestionID:'',
            questionCategory: {
              name:'',
              description: '',
              question_category_parent_id: '1',
              status: '0'
            },
            questionCategoryForm : {
              name: {
              elementType : 'input',
              elementConfig : {
                type : 'text',
                placeholder: 'Enter name of question category',
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
                placeholder: 'Enter description of question category',
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
              questionCategoryParent : {
                elementType : 'select',
                elementConfig : {
                  name: 'question_category_parent_id',
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
                      <span style={{marginLeft: '10px',textAlign:'left'}}>{data.question_category_parent_name}</span>
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
                       <Button plain={true} type="info" size="small" onClick={() => me.editQuestionCategory(data,me)}>Edit</Button>
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
      console.log('submit');
      console.log(this.state.questionCategory);
      var categoryQuestionParentID = this.state.questionCategory.question_category_parent_id;
      const questionCategory = {
        name : this.state.questionCategory.name,
        description : this.state.questionCategory.description,
        question_category_parent_id: categoryQuestionParentID,
        status : this.state.questionCategory.status
      }

      const updatedQuestionCategoryForm = {
        ...this.state.questionCategoryForm
      }
      //questionCategoryName input
      const questionCategoryNameElement = {
        ...updatedQuestionCategoryForm.name
      }
      questionCategoryNameElement.value= "";//this.state.questionCategory.name;
    
      const isValidQuestionCategoryName = this.checkValidity(this.state.questionCategoryForm.name.value, this.state.questionCategoryForm.name.validation);
      questionCategoryNameElement.valid = isValidQuestionCategoryName;

      let isValidForm = true;
      let finalMessage = "";
      if(!isValidQuestionCategoryName) {
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
          this.props.updateQuestionCategory(this.state.selectedQuestionCategoryID,questionCategory);
        }
        else {
          this.props.createQuestionCategory(questionCategory);
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
      let question_categories = [];
        if(nextProps.question_categories && nextProps.question_categories.length>0)
        {
          this.setState({loading:true});
          console.log(' nextProps.question_categories.....');
          console.log( nextProps.question_categories);
          nextProps.question_categories.map(item=>{
            return question_categories.push({
              'id': item._id,
              'question_category_parent_id': item.question_category_parent_id,
              'question_category_parent_name': item.question_category_parent_name,
              'name': item.name,
              'description': item.description,
              'status': item.status
            });
          })

          this.setState({
            loading: false,
            data: question_categories
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
      const questionCategory = {
        name : '',
        description : '',
        question_category_parent_id: '0',
        question_category_parent_name: '',
        status: '0'
      }
      this.setState({isUpdated : false, questionCategory : questionCategory});

      const updatedQuestionCategoryForm = {
        ...this.state.questionCategoryForm
      }
  
      //questionCategoryStatus select 
      const questionCategoryStatusElement = {
        ...updatedQuestionCategoryForm.status
      }
      questionCategoryStatusElement.value = "0";
  
      //questionCategoryParent select 
      const questionCategoryParentElement = {
        ...updatedQuestionCategoryForm.questionCategoryParent
      }
      questionCategoryParentElement.elementConfig.options = this.loadQuestionCategoryIntoArray();
      let selectedItem = "";
      //let newQuestionCategory = {
      //  ...questionCategory
      //}
      for(var j=0;j<this.props.question_categories.length;j++) {
        if(j===0) {
          //selectedItem = this.props.question_categories[j]._id + "_" + this.props.question_categories[j].name;
          //newQuestionCategory = {
          //  ...questionCategory,
          //  question_category_parent_id: this.props.question_categories[j]._id,
          //  question_category_parent_name: this.props.question_categories[j].name
          //}
        }
      }

      selectedItem = "0";
      /*let newQuestionCategory = {
        ...questionCategory,
        question_category_parent_id: "",
        question_category_parent_name: ""
      }*/

      questionCategoryParentElement.elementConfig.defaultOption.value = selectedItem;
      questionCategoryParentElement.value="0";

      //questionCategoryName input
      const questionCategoryNameElement = {
        ...updatedQuestionCategoryForm.name
      }
      questionCategoryNameElement.value= "";//this.state.questionCategory.name;
    
      const isValidFormElement = this.checkValidity(questionCategoryNameElement.value, questionCategoryNameElement.validation);
      questionCategoryNameElement.valid = isValidFormElement;
      
      /*if(!isValidFormElement) {
        this.setState({
          isValidForm:false,
          questionCategory : newQuestionCategory,
          message: 'Please fill in all required field!'
        });
      }
      else {
        this.setState({
          isValidForm:true,
          questionCategory : newQuestionCategory
        });
      }*/

      if(this.state.dialogVisible === false) {
        this.setState({dialogVisible: true, questionCategoryForm: updatedQuestionCategoryForm});
      }
    }

    deleteQuestionCategory = (item,me) => {
      this.props.deleteQuestionCategory(item.id);
    }

    editQuestionCategory = (item,me) => {
      this.setState({ 
        dialogVisible: true,
        isUpdated: true,
        selectedQuestionCategoryID: item.id 
      });
      
      const state = {...me.state.questionCategory};
      state['name'] = item.name;
      state['description'] = item.description;
      state['status'] = item.status;
      var categoryQuestionParentID =item.category_question_parent_id;//this.state.questionCategory.category_question_parent_id;

      const newState = {...me.state.questionCategoryForm};
      newState.questionCategoryParent.elementConfig.options = me.loadQuestionCategoryIntoArray();
      
      let selectedItem = item.id;
      let isFound="0";
      for(var j=0;j<this.props.question_categories.length;j++) {
        if(item.question_category_parent_id===this.props.question_categories[j]._id) {
          var selectedQuestionCategoryParentID = this.props.question_categories[j]._id;
          selectedItem = selectedQuestionCategoryParentID;
          isFound="1";
        }
      }

      if(isFound==="0") {
        selectedItem = "0";
        state['question_category_parent_id'] =  "" ;
        state['question_category_parent_name'] = "";
      }
      else {
        state['question_category_parent_id'] =  item.id ;
        state['question_category_parent_name'] = item.name;
      }

      newState.questionCategoryParent.elementConfig.defaultOption.value = selectedItem;
      newState.name.value = item.name;
      //newState.name.valid = this.checkValidity(newState.name.value, newState.name.validation);
  
      newState.description.value=item.description;
      newState.status.value = item.status;//this.state.questionCategory.status;
      //newState.questionCategoryParent.value= this.state.questionCategory.category_question_parent_id;
      //this.setState({questionCategoryForm:newState});
      //const newState = this.state.questionCategoryForm
      newState.questionCategoryParent.value= categoryQuestionParentID;
      
      this.setState({
        questionCategory:state, 
        questionCategoryForm:newState
      });
    }

    loadQuestionCategoryIntoArray() {
      let finalArray=[] ;
      finalArray.push({value:"0", displayValue : "Select parent", parentName: ""});

      this.props.question_categories.map((option,index) => {
        return finalArray.push({value: option._id, displayValue : option.name, parentName: option.question_category_parent_name});
      });

      return finalArray;
    }

    onChangeHandler(value,inputIdentifier){
      const state = this.state.questionCategory;
      state[inputIdentifier] = value;
      if(inputIdentifier === "questionCategoryParent") {
        state['question_category_parent_id'] = value;
      }
      
      this.setState({questionCategory : state});

      const updatedQuestionCategoryForm = {
        ...this.state.questionCategoryForm
      }
  
      const updatedQuestionCategoryElement = {
        ...updatedQuestionCategoryForm[inputIdentifier]
      }
  
      updatedQuestionCategoryElement.value = value;
      //const isValidFormElement = this.checkValidity(updatedQuestionCategoryElement.value, updatedQuestionCategoryElement.validation);
      //updatedQuestionCategoryElement.valid = isValidFormElement;
      //updatedQuestionCategoryElement.isDirty=true;
      //if(!isValidFormElement) {
      //  this.setState({isValidForm:false});
      //}
      //else {
      //  this.setState({isValidForm:true});
      //}
  
      updatedQuestionCategoryForm[inputIdentifier] = updatedQuestionCategoryElement;
      this.setState({questionCategoryForm: updatedQuestionCategoryForm});
    }

    render() { 
      let question_categories = [...this.state.data];
      if(this.state.data.length>0) {
        question_categories = this.getPaginationData(this.state.currentPage,question_categories);
      }

      const formElementsArray = [];
      for(let key in this.state.questionCategoryForm) {
        formElementsArray.push({
          id: key,
          config: this.state.questionCategoryForm[key]
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
                <h3 style={{display:'inline-block', marginLeft: '10px', marginBottom:'20px'}}>Question categories</h3>
                <div style={{display:'block', textAlign: 'left', marginLeft: '10px', marginBottom:'10px'}}>
                  <Button onClick={ () => this.openDialog() } type="primary">Create new category</Button>
                </div>
                <Dialog
                  title="Create a new question category"
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
                    data={question_categories}
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
  console.log(state.question_categories);
	return {
		question_categories : state.question_categories
	};
}

const mapDispatchToProps = dispatch => ({
  loadQuestionCategory:  dispatch(loadQuestionCategory()),
  deleteQuestionCategory: (questionCategoryID) => dispatch(deleteQuestionCategory(questionCategoryID)),
  createQuestionCategory: (questionCategory) => dispatch(createQuestionCategory(questionCategory)),
  updateQuestionCategory: (id,questionCategory) => dispatch(updateQuestionCategory(id,questionCategory))
});

export default hoc(QuestionCategories, mapStateToProps,mapDispatchToProps);