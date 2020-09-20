import React, {Component} from 'react';
import { Layout, Card, Button } from "element-react";
import {addCourseToCart} from '../../src/redux/action/CartAction';
import renderHTML from  'react-render-html';
import {hoc} from '../components/hoc/hoc';
import {Link} from 'react-router-dom';
class CourseItem extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    addCourseToCart = (courseID) => {
      //alert('add to cart');
      this.props.addCourseToCart(courseID);
      let me=this;
      setTimeout(function(){ me.props.history.push('/cart'); }, 2000);
    }

    render() { 
        let course_fee = this.props.item.fee;
        if(course_fee === 0) {
            course_fee = "Free";
        }
        else {
            course_fee = "$ "+ course_fee;
        }
        return ( 
            <React.Fragment>
                <Layout.Row style={{ padding: '15px 2px 15px 14px' }}>
          
          <Layout.Col span={4} offset={2}>
            <Card bodyStyle={{ padding: '0px' }}>
              <img style={{width:'240px', height:'135px'}}
                src={this.props.item.picture_url}
                className="image"
              />
              
            </Card>
          </Layout.Col>
          <Layout.Col span={10}>
            <Card bodyStyle={{ padding: 0, textAlign: 'left',minHeight:'138px' }}>
              <div style={{padding: '5px 2px 2px 14px', fontWeight: '600', fontSize:'1em'}}>
              <Link style={{textDecoration:'none'}} to={`/course/${this.props.item.id}`}>
                {this.props.item.title}
              </Link>
              </div>
              <div style={{padding: '2px 2px 2px 14px', fontSize:'0.85em'}}><i className="el-icon-files"></i>2 sections | 20 lessions | {this.props.item.duration} hours <i className="el-icon-time"></i></div>
              <div style={{padding: '0px 2px 2px 14px', fontWeight: '400', fontSize:'13px', color: '#686f7a'}}>
                <p>{renderHTML(this.props.item.short_description)}| By <strong>{this.props.item.instructor_name}</strong></p>
                </div>
            </Card>
          </Layout.Col>
          <Layout.Col span={4}>
            <Card bodyStyle={{ padding: 0 ,minHeight:'138px' }} >
              <div style={{ padding: 14 }}>
                <div style={{fontWeight: '700', fontSize:'1.5em',marginBottom: '20px'}}>{course_fee}</div>
                <div>
                  <Button onClick={()=>this.addCourseToCart(this.props.item.id)} style={{marginBottom:'20px'}}  size="medium" type="success">Add to cart</Button>
                </div>
              </div>
            </Card>
          </Layout.Col>
        </Layout.Row>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => ({
  addCourseToCart: (courseID) => dispatch(addCourseToCart(courseID))
});

export default hoc(CourseItem, mapStateToProps,mapDispatchToProps);