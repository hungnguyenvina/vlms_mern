import React, { Component } from 'react'
import  { Menu } from 'element-react';
import { logout} from '../../redux/action/UserAction';
import { hoc } from '../hoc/hoc';
import {Link} from 'react-router-dom';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isAdmin: props.user.isAdmin,
          name: props.user.name
        }
    }
    onSelect() {

    }

    logOut = () => {
        //alert('logout...');
        this.props.logout();
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                <Link style={{textDecoration:'none'}} to='/'>
                    <Menu.Item index="1">Home</Menu.Item>
                </Link>
                <Menu.Item style={{float:'right'}} index="13">Welcome , {this.state.name}</Menu.Item>
                <Menu.Item  style={{float:'right'}} index="13"><span onClick={()=>this.logOut()}>Logout</span></Menu.Item>
            </Menu>
        </div>
        )
  }
}

const mapStateToProps = state => {
	return {
		
	};
}

const mapDispatchToProps = dispatch => ({
	logout: (abc) => dispatch(logout(abc))
});


export default hoc(Header, mapStateToProps,mapDispatchToProps);
