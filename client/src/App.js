import React, { Component } from 'react';
import './App.css';
import 'element-theme-default';

import QuestionCategories from './components/Admin/QuestionCategories';
import CourseCategories from './components/Admin/CourseCategories';
import Courses from './components/Admin/Courses';
import CreateCourse from './components/Instructor/CreateCourse';
import ManageCourse from './components/Instructor/ManageCourses';
import UpdateCourseCurriculum from './components/Instructor/UpdateCourseCurriculum';
import TakeCourse from './components/User/TakeCourse';
import AdminLayout from './components/Admin/AdminLayout';
import UserLayout from './components/User/UserLayout';
import InstructorLayout from './components/Instructor/InstructorLayout';
import HomePage from './components/HomePage';
import CourseDetail from './components/CourseDetail';
import {Switch,BrowserRouter, Route} from 'react-router-dom';
import CourseList from './components/CourseList';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Auth from './components/hoc/auth';
import BecomeAnInstructor from './components/User/BecomeAnInstructor';
import EnrolledCourses from './components/User/EnrolledCourses';
import UpdateCourse from './components/Instructor/UpdateCourse';
class App extends Component {

  componentDidMount(){
    /*axios.get('/api/users').then(result=>{
      console.log(result.data);
    });*/
  }

  render() {
    return (
      <div className="App">
        {/*<AdminLayout>
          <Switch>
            <Route exact component={QuestionCategories} path="/question_categories"></Route>
            <Route exact component={CourseCategories} path="/course_categories"></Route>
            <Route exact component={Courses} path="/courses"></Route>
          </Switch>
        </AdminLayout>
        <InstructorLayout>
          <Switch>
            <Route exact component={CreateCourse} path="/instructor/create_course"></Route>
            <Route exact component={ManageCourse} path="/instructor/manage_course"></Route>
            <Route exact component={UpdateCourseCurriculum} path='/instructor/update_course_curriculum/:id' />
          </Switch>
        </InstructorLayout>
        <UserLayout>
          <Switch>
            <Route exact component={TakeCourse} path='/user/take_course/:id/:lession_id' />
          </Switch>
        </UserLayout>
      <HomePage>
            <Route exact component={CourseList} path="/"></Route>
            <Route exact component={CourseDetail} path='/course/:id' />
            <Route exact component={Auth(Cart,true)} path="/cart"></Route>
            <Route exact component={Login} path="/login"></Route>
       </HomePage>
        */}
       <HomePage>
            <Route exact component={Auth(CourseList,true)} path="/"></Route>
            <Route exact component={Auth(CourseDetail,true)} path='/course/:id' />
            <Route exact component={Auth(Cart,false)} path="/cart"></Route>
            <Route exact component={Login} path="/login"></Route>
            <Route exact component={Register} path="/register"></Route>
            <Route exact component={Auth(QuestionCategories,false)} path="/admin/question_categories"></Route>
            <Route exact component={Auth(CourseCategories,false)} path="/admin/course_categories"></Route>
            <Route exact component={Auth(Courses,false)} path="/admin/courses"></Route>
            <Route exact component={Auth(CreateCourse,false)} path="/instructor/create_course"></Route>
            <Route exact component={Auth(ManageCourse,false)} path="/instructor/manage_course"></Route>
            <Route exact component={Auth(UpdateCourse,false)} path='/instructor/update_course_info/:id' />
            <Route exact component={Auth(UpdateCourseCurriculum,false)} path='/instructor/update_course_curriculum/:id' />
            <Route exact component={Auth(EnrolledCourses,false)} path="/user/manage_course"></Route>
            <Route exact component={Auth(TakeCourse,false)} path='/user/take_course/:id/:lession_id' />
            <Route exact component={Auth(BecomeAnInstructor,false)} path='/user/become_an_instructor' />
       </HomePage>
       
      </div>
    );
  }
}

export default App;
