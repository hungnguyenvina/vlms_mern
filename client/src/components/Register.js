import React, { Component } from "react";
import {Form,Input,Button,Layout} from 'element-react';
import { register } from '../redux/action/UserAction';
import {hoc} from './hoc/hoc';
import {withRouter} from 'react-router-dom';
import HomeLayout from './HomeLayout';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        email: "vt2804@gmail.com",
        password: "123456"
      }
    };
  }

  onSubmit = () =>{
    //console.log('user info');
    //console.log(this.state.user);
    this.props.register(this.state.user);
  }

  onChange(key, value) {
    const newUser = {
        ...this.state.user,
        [key]: value
    };
    //console.log(newUser);
    this.setState({user:newUser});

  }

  componentWillReceiveProps(nextProps) {
    console.log('component will receive props');
    console.log(nextProps.registerSuccess);
    if(nextProps.registerSuccess) {
      //alert('pp');
      var me=this;
      setTimeout(function(){ me.props.history.push('/'); }, 2000);
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
          <Form.Item label="Name">
            <Input
              value={this.state.user.name}
              onChange={this.onChange.bind(this, "name")}
            />
          </Form.Item>
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
          <Button onClick={()=> this.onSubmit()} style={{marginBottom:'10px'}}  size="medium" type="success">Register</Button>
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
      registerSuccess: state.users.registerSuccess
    };
}

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(register(user))
});

export default hoc(withRouter(Register), mapStateToProps,mapDispatchToProps);
