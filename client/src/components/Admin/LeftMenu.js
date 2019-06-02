import React, { Component } from 'react'
import  { Menu } from 'element-react';
import {Link} from 'react-router-dom';
export default class LeftMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAdmin: false,
        name: ''
      }
    }
    render() {
        return (
            <React.Fragment>
              <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
                <Link style={{textDecoration:'none'}} to='/admin/course_categories'>
                  <Menu.Item index="2"><i className="el-icon-menu"></i>Course categories</Menu.Item>
                </Link>
                <Link style={{textDecoration:'none'}} to='/admin/courses'>
                  <Menu.Item index="3"><i className="el-icon-setting"></i>Courses</Menu.Item>
                </Link>
                <Link style={{textDecoration:'none'}} to='/admin/question_categories'>
                  <Menu.Item index="3"><i className="el-icon-setting"></i>Question categories</Menu.Item>
                </Link>
              </Menu>
            </React.Fragment>
        )
      }
      
      onOpen() {
      
      }
      
      onClose() {
      
      }
}