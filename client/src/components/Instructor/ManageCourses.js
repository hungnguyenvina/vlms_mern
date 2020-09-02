import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Button, Loading, Tag, Table, Pagination } from "element-react";
import CourseImage from "../../images/course.png";
import { loadInstructorCourses,deleteCourse} from "../../redux/action/CourseAction";
import { hoc } from "../hoc/hoc";
import InstructorLayout from './InstructorLayout';
class ManageCourses extends Component {
  constructor(props) {
    super(props);
    let me = this;
    this.state = {
      loading: true,
      message: "",
      columns: [
        {
          type: "index"
        },
        {
          label: "Category",
          prop: "category_parent_name",
          align: "left",
          width: 230,
          render: function(data) {
            return (
              <span>
                <span style={{ marginLeft: "10px", textAlign: "left" }}>
                  {data.course_category_parent_name}
                </span>
              </span>
            );
          }
        },
        {
          label: "Name",
          prop: "name",
          width: 230,
          align: "left",
          render: function(data) {
            return <Link to={`/instructor/update_course_curriculum/${data.id}`}>{data.title}</Link>;
          }
        },
        {
          label: "Fee($)",
          prop: "fee",
          width: 80,
          align: "left",
          render: function(data) {
			if (data.fee === 0) {
				return (
				  <Button type="success" size="small">
					{data.fee}
				  </Button>
				);
			  } else {
				return (
				  <Button type="warning" size="small">
					{data.fee}
				  </Button>
				);
			  }
          }
        },
        {
          label: "Description",
          prop: "description",
          width: 280,
          align: "left",
          render: function(data) {
            return <span>{data.description}</span>;
          }
        },
        {
          label: "Status",
          prop: "status",
          width: 80,
          align: "left",
          render: function(data) {
            if (data.status === 0) {
              return (
                <Button type="info" size="small">
                  Enable
                </Button>
              );
            } else {
              return (
                <Button type="danger" size="small">
                  Disable
                </Button>
              );
            }
          }
        },
        {
          label: "Operations",
          render: function(data) {
            return (
              <span>
                <Button
                  type="danger"
                  size="small"
                  onClick={() => me.deleteCourse(data, me)}
                >
                  Delete
                </Button>
              </span>
            );
          }
        }
      ],
      currentPage: 1,
      noOfItemsPerPage: 5,
      data: [],
      dialogVisible: false,
      isUpdated: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  deleteCourse = (item,me) => {
    this.props.deleteCourse(item.id);
  }

  handleClick(event) {
    //alert("select page" + Number(event.target.id));
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  componentWillReceiveProps(nextProps) {
    let courses = [];
    if (nextProps.courses && nextProps.courses.length > 0) {
      this.setState({ loading: true });
      nextProps.courses.map(item => {
        return courses.push({
          id: item.id,
          title: item.title,
          description: item.description,
          fee: item.fee,
          course_category_parent_name: item.course_category_name,
          status: item.status
        });
      });

      this.setState({
        loading: false,
        data: courses
      });
    } else {
      this.setState({
        loading: false,
        data: []
      });
    }
  }

  onCurrentChange = currentPage => {
    this.setState({
      currentPage: currentPage
    });
  };

  getPaginationData(currentPage, data) {
    const startIndex = (currentPage - 1) * this.state.noOfItemsPerPage;
    const endIndex = startIndex + this.state.noOfItemsPerPage;
    data = data.slice(startIndex, endIndex);
    return data;
  }

  render() {
    const style1 = {
      width: "16px",
      height: "16px"
    };

    let courses = [...this.state.data];
    if (this.state.data.length > 0) {
      courses = this.getPaginationData(this.state.currentPage, courses);
    }

    return (
      <InstructorLayout {...this.props}>
      <React.Fragment>
        <h3
          style={{
            display: "inline-block",
            marginLeft: "10px",
            marginBottom: "20px"
          }}
        >
          Courses
        </h3>
        <Loading loading={this.state.loading}>
          <Table
            style={{ width: "95%", marginLeft: "10px", marginBottom: "20px" }}
            columns={this.state.columns}
            data={courses}
            border={true}
            highlightCurrentRow={true}
            onCurrentChange={item => {
              console.log(item);
            }}
          />
        </Loading>
      </React.Fragment>
      </InstructorLayout>
    );
  }
}

const mapStateToProps = state => {
  //console.log(state.courses);
  return {
    courses: state.courses.instructor_courses
  };
};

const mapDispatchToProps = dispatch => ({
  loadInstructorCourses: dispatch(loadInstructorCourses()),
  deleteCourse: (courseID) => dispatch(deleteCourse(courseID)),
});

export default hoc(ManageCourses, mapStateToProps, mapDispatchToProps);