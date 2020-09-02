import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout, Card, Button,Collapse, Dialog } from "element-react";
import { loadSingleCourse,loadCourseCurriculum } from '../redux/action/CourseAction';
import { addCourseToCart } from '../redux/action/CartAction';
import {Loading} from 'element-react';
import {hoc} from '../components/hoc/hoc';
import renderHTML from  'react-render-html';
import { actions } from 'react-jplayer';
import VideoPlayer from '../components/Jplayer/videoPlayer';
import $ from 'jquery';
import HomeLayout from './HomeLayout';
class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        leftMenu:[],
        dialogVisible: false
    };
  }

  
  onOpen() {}

  onClose() {}

  componentDidMount() {
      const courseID = this.props.match.params.id;
      //alert('courseID = '+ courseID);
      this.props.loadSingleCourse(courseID);
      this.props.loadCourseCurriculum(courseID);
  }

  playVideo(lessionContent) {
    //alert('playing video'+lessionContent);
    let media = ""; 
		var indexMP4 = lessionContent.endsWith("mp4");
		var indexM4V = lessionContent.endsWith("m4v");
                        var indexWEBMV = lessionContent.endsWith("webm");
                        var indexOGV = lessionContent.endsWith("ogv");
                        if(indexMP4 > 0)
                        {
                            media = 
                            {
                                // sources: {ogv: 'http://techslides.com/demos/sample-videos/small.ogv'},
                                sources: {
                                    m4v: lessionContent
                                }, 
                                title: null,
                                artist: null,
                                poster: null,
                                free: false,
                                tracks: [],
                            };
                        }
												
												if(indexM4V > 0)
                        {
                            media = 
                            {
                                // sources: {ogv: 'http://techslides.com/demos/sample-videos/small.ogv'},
                                sources: {
                                    m4v: lessionContent
                                }, 
                                title: null,
                                artist: null,
                                poster: null,
                                free: false,
                                tracks: [],
                            };
												}
												
                        if(indexWEBMV > 0)
                        {
                            media = 
                            {
                                sources: {
                                    webmv: lessionContent
                                }, 
                                title: null,
                                artist: null,
                                poster: null,
                                free: false,
                                tracks: [],
                            };
                        }

                        if(indexOGV > 0)
                        {
                            media = 
                            {
                                sources: {
                                    ogv: lessionContent
                                }, 
                                title: null,
                                artist: null,
                                poster: null,
                                free: false,
                                tracks: [],
                            };
                        }

                        //alert('this.props.id : '+this.props.id);
                        //console.log('media : '+media);
                        this.props.setMedia('VideoPlayer', media);
                        this.setState({dialogVisible: true});  
                        //alert($('.jp-media'));
                        $('.jp-media').attr("width","100%");                
  }
  componentWillReceiveProps(nextProps) {
    //console.log('receive props');
    let currentCurriculum = {...this.state.curriculum};
    const curriculums = nextProps.curriculum;
    console.log(curriculums);
    let sectionArrayDistinct = [];
    let sectionArray = [];
    let lessionArray = [];
    for (var i = 0; i < curriculums.length; i++) {
        const sectionID = curriculums[i].section_id._id;
        let newLession =  { 
            section_id: sectionID,
            id: curriculums[i]._id,
            name:curriculums[i].name, 
            content: curriculums[i].content
        }
        lessionArray.push(newLession);
    }

    for (var i = 0; i < curriculums.length; i++) {
        const sectionID = curriculums[i].section_id._id;
        if(!sectionArrayDistinct.includes(sectionID)) {
            sectionArrayDistinct.push(sectionID);
            let newSection =  
            { 
                title: curriculums[i].section_id.name,
                description: '',
                lessions:lessionArray.filter(item=> {
                    return item.section_id != sectionID
                })
            }
    
            sectionArray.push(newSection);
        }
    }

    console.log(sectionArray);
    let leftMenu=[];
    for(var k=0;k<sectionArray.length;k++){
      let subLeftMenu=[];
      for(var j=0;j<sectionArray[k].lessions.length;j++){
        const indexForSubItem = k.toString()+"-"+j.toString();
        const lessionContent = sectionArray[k].lessions[j].content;
        const courseID = this.props.match.params.id;
        const linkToLession = "/user/take_course/"+courseID+"/"+ sectionArray[k].lessions[j].id;
         subLeftMenu.push(<div style={{minHeight: '25px', background:'lavender', marginTop:'15px', padding:'5px 5px 5px 5px'}}
          key={indexForSubItem}>
                            <Link style={{textDecoration:'none'}} to={linkToLession}>{sectionArray[k].lessions[j].name}</Link>
                            <Button onClick={()=> this.playVideo(lessionContent)} style={{marginBottom:'10px'}}  size="small" type="success">Preview</Button>
                            </div>    )
      }
      
 
      let x = (<Collapse.Item
                  key={k}
                  title={sectionArray[k].title}
                > {subLeftMenu}
                </Collapse.Item>
              );
      leftMenu.push(x);
    }

    console.log(leftMenu);

    this.setState({leftMenu:leftMenu});

  }
  
  //componentWillReceiveProps(nextProps) {
      //alert('component will receive props');
     // this.setState({
     //   course: nextProps.single_course,
    //    loading:false
    //  });
  //}

  addCourseToCart = () => {
    const courseID = this.props.match.params.id;
    //alert('adding '+ courseID+ ' to cart');
    this.props.addCourseToCart(courseID);
    let me=this;
    setTimeout(function(){ me.props.history.push('/cart'); }, 2000);
  }

  render() {
    //alert('this:'+this.props.single_course);
    const activeName = "1";
    let course_title = "";
    let course_price = "";
    let course_description = "";
    let course_duration="";
    let instructor_name= "";
    let course_picture_url="";
    let loading = <Loading style={{ width: '400px', height:'400px', margin :'20px auto' }} loading={this.state.loading} />; 
    //alert(typeof(this.props.single_course.short_description));
    if("undefined" !== typeof(this.props.single_course.short_description) )
    {
        course_description = renderHTML(this.props.single_course.short_description);
        course_price = this.props.single_course.fee;
        course_title = this.props.single_course.title;
        instructor_name= this.props.single_course.instructor_name;
        //alert('instructor_name:'+instructor_name);
        course_duration=this.props.single_course.duration;
        course_picture_url=this.props.single_course.course_picture_url;
        loading = "";
    }
    if(course_price ===0) {
        course_price = "Free";
    }
    else {
        course_price = "$ " + course_price;
    }
    return (
      <HomeLayout {...this.props}>
      <React.Fragment>
        {loading}
        <Dialog
                  title={course_title}
                  visible={ this.state.dialogVisible }
                  onCancel={ () => this.setState({ dialogVisible: false }) }
                >
                  <Dialog.Body>
                    <VideoPlayer style={{width:'200px !important'}} id="VideoPlayer" m4vURL={course_picture_url} />
                  </Dialog.Body>

                  <Dialog.Footer className="dialog-footer">
                    <Button onClick={ (event) => this.onSubmitHandler(event) }>Save</Button>
                    <Button type="primary" onClick={ () => this.setState({ dialogVisible: false }) }>Close</Button>
                  </Dialog.Footer>
                </Dialog>
        <Layout.Row style={{ display:("undefined" !== typeof(this.props.single_course.short_description))?'inline-block':'none', color:'#ffffff', padding: "15px 0px 15px 0px",minHeight: '295px',background: 'linear-gradient(#29303B,#29303B,#29303B)',textAlign:'left' }}>
          <Layout.Col span={18}>
        
            <div style={{padding: '25px 2px 2px 94px', fontWeight: '600', fontSize:'2em',color:'#f8f814'}}>{course_title}</div>
            <div style={{padding: '25px 2px 2px 94px', fontSize:'0.85em'}}><i className="el-icon-files"></i>2 sections | 20 lessions | {course_duration} hours <i className="el-icon-time"></i></div>
            <div style={{padding: '0px 2px 2px 94px', fontWeight: '400', fontSize:'13px'}}>
                <p>{course_description}| By <strong>{instructor_name}</strong></p>
            </div>
          </Layout.Col>
          <Layout.Col span={4} style={{padding: '25px 2px 2px 0px'}}>
           
          <Card bodyStyle={{ padding: '0px',textAlign:'center' }}>
              <img style={{width:'100%'}}
                src={course_picture_url}
                className="image"
              />
              <div style={{ padding: 7 }}>
                <div style={{fontWeight: '700', fontSize:'2.5em',marginBottom: '10px',textAlign:'center', color:'#f54e20'}}>{course_price}</div>
                <div>
                  <Button onClick={()=>this.addCourseToCart()} style={{marginBottom:'10px',width:'100%'}}  size="medium" type="danger">Add to cart</Button>
                </div>
              </div>
            </Card>
           
          </Layout.Col>
        </Layout.Row>

        <Layout.Row style={{display:("undefined" !== typeof(this.props.single_course.short_description))?'block':'none',padding: "15px 0px 15px 0px", textAlign:'left'}}>
          <Layout.Col span={18} style={{padding: '25px 2px 2px 64px'}}>
          <Collapse value={activeName}>
          {this.state.leftMenu}
     
    </Collapse>
          </Layout.Col>
        </Layout.Row>

      </React.Fragment>
      </HomeLayout>
    );
  }
}

const mapStateToProps = state => {
    return {
        single_course : state.courses.single_course,
        curriculum: state.courses.curriculum
    };
}

const mapDispatchToProps = dispatch => ({
    loadSingleCourse: (courseID) => dispatch(loadSingleCourse(courseID)),
    loadCourseCurriculum: id => dispatch(loadCourseCurriculum(id)),
    setMedia: (id,media) => dispatch(actions.setMedia(id,media)),
    addCourseToCart: (courseID) => dispatch(addCourseToCart(courseID))
});

export default hoc(CourseDetail, mapStateToProps,mapDispatchToProps);