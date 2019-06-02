import React, { Component } from 'react'
import  { Menu } from 'element-react';
import {logout} from '../../src/redux/action/UserAction';
import {hoc} from '../components/hoc/hoc';
import {Link} from 'react-router-dom';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isAdmin: false,
          name: ''
        }
    }

    onSelect() {

    }


    logOut = () => {
        alert('logout...');
        this.props.logout();
        this.props.history.push('/login');
    }

    redirectToPrivatePage = () => {
        alert('welcome');
        const role = this.props.user.role;
        let me=this;
        if(role === 0) {
            alert('is admin');
            setTimeout(function(){ me.props.history.push('/admin/course_categories'); }, 2000);
          }
          else if(role === 1) {
            alert('is instructor');
            setTimeout(function(){ me.props.history.push('/instructor/manage_course'); }, 2000);
          }
          else if(role === 2) {
            alert('is user');
            setTimeout(function(){ me.props.history.push('/'); }, 2000);
          }
    }
    componentDidMount() {
        console.log(this.props);
        
        
        if("undefined" !== typeof(this.props.users) )
        {
            
            if(!this.props.users.loginSuccess) {
                if("undefined" !== typeof(this.props.users.user) )
                {
                    alert('ddd');
                    this.setState({
                        isAdmin: false,
                        name: ''
                    });
                }
            }
            else {
                alert('isEmpty');
                this.setState({
                    isAdmin: this.props.users.user.isAdmin,
                    name: this.props.users.user.name
                });
            }
        }
        else{
            this.setState({
                isAdmin: false,
                name: ''
            });
        }
    }
    render() {
        const welCome = "";
        let menu = "";
        if(this.state.name!=="") {
            menu=   (
                <React.Fragment>
                    <Menu.Item  style={{float:'right'}} index="13"><span onClick={()=>this.redirectToPrivatePage()}>Welcome 1, {this.state.name}</span></Menu.Item>
                    <Menu.Item  style={{float:'right'}} index="13"><span onClick={()=>this.logOut()}>Logout</span></Menu.Item>
                </React.Fragment>
            )
        }
        else{
            menu=   (
                <React.Fragment>
                    <Link style={{textDecoration:'none'}} to='/login'><Menu.Item style={{float:'right'}} index="13">Login</Menu.Item></Link>
                    <Link style={{textDecoration:'none'}} to='/register'><Menu.Item  style={{float:'right'}} index="13">Register</Menu.Item></Link>
                </React.Fragment>
            )
        }
        return (
            <div>
            <Menu theme="dark" defaultActive="1" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
                <Link style={{textDecoration:'none'}} to='/'>
                    <Menu.Item index="1">Home</Menu.Item>
                </Link>
                {menu}
            </Menu>
        </div>
        )
  }
}

const mapStateToProps = state => {
	return {
        loginSuccess : state.users.loginSuccess,
        users: state.users
	};
}

const mapDispatchToProps = dispatch => ({
	logout: (abc) => dispatch(logout(abc))
});

export default hoc(Header, mapStateToProps,mapDispatchToProps);
