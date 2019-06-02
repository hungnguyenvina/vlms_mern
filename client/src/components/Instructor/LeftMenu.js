import React, { Component } from 'react'
import  { Menu } from 'element-react';
import {Link} from 'react-router-dom';
export default class LeftMenu extends Component {
    render() {
        return (
            <div>
            <Menu defaultActive="2" className="el-menu-vertical-demo" onOpen={this.onOpen.bind(this)} onClose={this.onClose.bind(this)}>
              <Link style={{textDecoration:'none'}} to='/instructor/create_course'>
                <Menu.Item index="2"><i className="el-icon-menu"></i>Create your course</Menu.Item>
              </Link>
              <Link style={{textDecoration:'none'}} to='/instructor/manage_course'>
                <Menu.Item index="3"><i className="el-icon-menu"></i>Courses</Menu.Item>
              </Link>
            </Menu>
            </div>
        )
      }
      
      onOpen() {
      
      }
      
      onClose() {
      
      }
}