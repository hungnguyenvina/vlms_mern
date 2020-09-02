import React, { Component } from 'react'
import  { Menu } from 'element-react';
export default class Footer extends Component {
    onSelect() {

    }

    render() {
        return (
            <div>
                <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                    <Menu.Item index="3"><div style={{display:'block',textAlign:'center'}}>MERN Online Course Website - copyright by Nguyen The Hung, 2020 (vt2804@gmail.com)</div>
                    </Menu.Item>
                </Menu>
            </div>
        )
  }
}
