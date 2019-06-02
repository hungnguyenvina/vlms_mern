import React, { Component } from "react";
import CourseList from './CourseList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
     
    );
  }
}
export default HomePage;
