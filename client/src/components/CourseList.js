import React, {Component} from 'react';
import CourseItem from './CourseItem';
import { loadCourses } from '../redux/action/CourseAction';
import {Loading} from 'element-react';
import {hoc} from '../components/hoc/hoc';
import HomeLayout from './HomeLayout';
class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            courses: [],
            currentPage: 1,
            noOfItemsPerPage: 5
        }
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
                'short_description': item.short_description,
                'fee': item.fee,
                'duration': item.duration,
                'course_category_parent_name': item.course_category_parent_name,
                'picture_url': item.course_picture_url,
                'status': item.status,
                'instructor_name': item.instructor_name
              });
            })

            this.setState({
              loading: false,
              courses: courses
            })
          }
          else {
            this.setState({
              loading: false,
              courses: []
            })
          }
    }

    getPaginationData(currentPage,data) {
        const startIndex = (currentPage-1) * this.state.noOfItemsPerPage;
        const endIndex = startIndex + this.state.noOfItemsPerPage;
        data = data.slice(startIndex,endIndex);
        return  data;
    }

    render() { 
        let courses = [...this.state.courses];
        if(this.state.courses.length>0) {
            courses = this.getPaginationData(this.state.currentPage,courses);
        }

        return ( 
          <HomeLayout {...this.props}>
            <React.Fragment>
               <Loading loading={this.state.loading} />
                {courses.map(item=>{
                    return <CourseItem {...this.props} key={item.id} item={item} />
                })}
                
            </React.Fragment>
          </HomeLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        courses : state.courses.courses
    };
}

const mapDispatchToProps = dispatch => ({
    loadCourses:  dispatch(loadCourses())
});  

export default hoc(CourseList, mapStateToProps,mapDispatchToProps);