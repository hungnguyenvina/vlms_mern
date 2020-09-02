import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loadAuthenticatedUser} from '../../redux/action/UserAction';
import {hoc} from './hoc';

export default function(ComposedComponent,noNeedAuthenticate,role=0) {

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true
        }
    }

    componentWillReceiveProps(nextProps) {
        //alert('componentWillReceiveProps');
        //console.log('componentWillReceiveProps');
        console.log(nextProps);
        if(!nextProps.user) {
            //alert('not authenticate111');
            if(noNeedAuthenticate) {
                this.setState({loading: false});
            }
            else{
                this.props.history.push('/login');
            }
        }
        else {
            if(nextProps.user.isAuth1) {
                //alert('is authenticated');
                this.setState({loading: false});
            }
            else {
                //alert('not authenticate');
                if(noNeedAuthenticate) {
                    this.setState({loading: false});
                }
                else{
                    this.props.history.push('/login');
                }
            }
        }
      }

    componentDidMount(){
        //alert('componentDidMount');
        this.props.loadAuthenticatedUser();
    }

    render() { 
        if(this.state.loading) {
            return (
                <div>
                    Loading....
                </div>
            )
        }
        return ( 
            <ComposedComponent {...this.props}  user={this.props.user} />
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.users.user
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    loadAuthenticatedUser: () => dispatch(loadAuthenticatedUser())
  });
  
  return connect(mapStateToProps,mapDispatchToProps)(Authentication);
 
}