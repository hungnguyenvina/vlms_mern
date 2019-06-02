import React, {Component} from 'react';
import UserLayout from './UserLayout';
import {Button} from 'element-react';
import { becomeAnInstructor } from '../../redux/action/UserAction';
import { hoc } from '../hoc/hoc';
class BecomeAnInstructor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    becomeAnInstructor = () => {
        const userID = this.props.user.id;
        alert('userID = '+userID);
        this.props.becomeAnInstructor(userID);
    }

    render() { 
        return ( 
            <UserLayout {...this.props}>
                <React.Fragment>
                    <h3>Become an instructor !!!</h3>
                    <div>
                        <Button onClick={()=>this.becomeAnInstructor()} style={{marginBottom:'20px'}}  size="large" type="success">Become an instructor</Button>
                    </div>
                </React.Fragment>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
}

const mapDispatchToProps = dispatch => ({
    becomeAnInstructor: id => dispatch(becomeAnInstructor(id)),
});

export default hoc(BecomeAnInstructor, mapStateToProps,mapDispatchToProps);