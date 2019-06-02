import React from 'react';
import { Button, Loading , Tag, Table, Pagination } from 'element-react';
import {loadCourses} from '../../redux/action/CourseAction';
import {hoc} from '../hoc/hoc';
import AdminLayout from './AdminLayout';
class Courses extends React.Component {
    constructor(props) {
        super(props);
        let me=this;
        this.state = { 
            loading: true,
            message:'',            
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
                    return <Tag>{data.title}</Tag>
                  }
                },
                {
                  label: "Fee($)",
                  prop: "fee",
                  width: 80,
                  align:'left',
                  render: function(data){
                    return <Tag>{data.fee}</Tag>
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

        return ( 
          <AdminLayout {...this.props}>
            <React.Fragment>
                <h3 style={{display:'inline-block', marginLeft: '10px', marginBottom:'20px'}}>Courses</h3>
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