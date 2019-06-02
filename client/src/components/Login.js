import React, { Component } from "react";
import {Form,Input,Button,Layout} from 'element-react';
import { login } from '../redux/action/UserAction';
import {hoc} from '../components/hoc/hoc';
import {withRouter} from 'react-router-dom';
import HomeLayout from './HomeLayout';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "vt2804@gmail.com",
        password: "123456"
      }
    };
  }

  onSubmit = () =>{
    console.log('user info');
    console.log(this.state.user);
    this.props.login(this.state.user);
  }

  onChange(key, value) {
    const newUser = {
        ...this.state.user,
        [key]: value
    };
    console.log(newUser);
    this.setState({user:newUser});

  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
    console.log(nextProps);
    console.log(nextProps.loginSuccess);
    if(nextProps.loginSuccess) {
      const role = nextProps.user.role;
      alert('role : '+ role);
      var me=this;
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
      //this.props.history.push('/cart');
    }
  }

  render() {
    return (
      <HomeLayout {...this.props}>
      <React.Fragment>
        <Layout.Row className="tac" style={{marginTop:'30px'}}>
          <Layout.Col xs="24" sm="24" md="24" lg="12" offset="6">
        <Form
          className="en-US"
          model={this.state.user}
          labelWidth="120"
          onSubmit={this.onSubmit.bind(this)}
        >
          <Form.Item label="Email">
            <Input
              value={this.state.user.email}
              onChange={this.onChange.bind(this, "email")}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
                type="password"
                value={this.state.user.password}
                onChange={this.onChange.bind(this, "password")}
            />
          </Form.Item>
          <Form.Item>
          <Button onClick={()=> this.onSubmit()} style={{marginBottom:'10px'}}  size="medium" type="success">Login</Button>
          </Form.Item>
        </Form>
        </Layout.Col>
            </Layout.Row>
      </React.Fragment>
      </HomeLayout>
    );
  }
}

const mapStateToProps = state => {
    return {
      loginSuccess: state.users.loginSuccess,
      user: state.users.user
    };
}

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(login(user))
});

export default hoc(withRouter(Login), mapStateToProps,mapDispatchToProps);
