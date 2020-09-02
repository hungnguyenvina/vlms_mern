import React, { Component } from "react";
import { Menu } from "element-react";
import { Link } from "react-router-dom";
import { updateCourseCurriculum, loadCourseCurriculum } from "../../redux/action/CourseAction";
import { hoc } from "../hoc/hoc";
class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftMenu:[]
    };
  }
  
  componentDidMount() {
    const courseID = this.props.match.params.id;
    //alert("courseID = "+courseID);
    this.props.loadCourseCurriculum(courseID);
  }

  componentWillReceiveProps(nextProps) {
    //console.log('receive props');
    const role = nextProps.user.role;
    //alert('role='+role);
    const me=this;
    if(role === 1) {
      //alert('is instructor');
      setTimeout(function(){ me.props.history.push('/instructor/manage_course'); }, 2000);
    }
    const curriculums = nextProps.curriculum;
    //console.log(curriculums);
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

    const courseID = this.props.match.params.id;
    //console.log(sectionArray);
    let leftMenu=[];
    for(var k=0;k<sectionArray.length;k++){
      let subLeftMenu=[];
      for(var j=0;j<sectionArray[k].lessions.length;j++){
        const indexForSubItem = k.toString()+"-"+j.toString();
        const linkToLession = "/user/take_course/"+courseID+"/"+ sectionArray[k].lessions[j].id;
         subLeftMenu.push(<Link style={{textDecoration:'none'}} to={linkToLession}><Menu.Item 
                            index={indexForSubItem}
                            key={indexForSubItem}
                          >
                            {sectionArray[k].lessions[j].name}
                          </Menu.Item></Link>)
      }
      
      let x = (<Menu.SubMenu
                  key={k}
                  index={k.toString()}
                  title={
                    <span>
                      <i className="el-icon-message" />{sectionArray[k].title}
                    </span>
                  }
                > {subLeftMenu}
              </Menu.SubMenu>);
      leftMenu.push(x);
    }
    //console.log(leftMenu);
    this.setState({leftMenu:leftMenu});
  }

  render() {
    //console.log('render in leftmenu of user...');
    //console.log(this.props.user);
    return (
      <div>
        <Menu
          defaultActive="2"
          className="el-menu-vertical-demo"
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
        >
          {this.state.leftMenu}
          <Link style={{textDecoration:'none'}} to='/user/become_an_instructor'>
                <Menu.Item index="3"><i className="el-icon-menu"></i>Become an instructor</Menu.Item>
          </Link>
        </Menu>
      </div>
    );
  }

  onOpen() {}

  onClose() {}
}

const mapStateToProps = state => {
  return {
    curriculum: state.courses.curriculum,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => ({
  loadCourseCurriculum: id => dispatch(loadCourseCurriculum(id))
});

export default hoc(LeftMenu, mapStateToProps, mapDispatchToProps);
