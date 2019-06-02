import React, {Component} from 'react';
import axios,{post} from 'axios';
import QuestionImage from '../../images/question.png'
import {connect} from 'react-redux';
import { updateUserProfile } from '../../redux/action/UserAction';
import { updateCourseCurriculum,loadCourseCurriculum } from '../../redux/action/CourseAction';
import InputForm from '../UI/InputForm';
import renderHTML from 'react-render-html';
import { hoc } from '../hoc/hoc';
import CustomizeButton from '../UI/CustomizeButton';
import CurriculumSectionHOC from './CurriculumSectionHOC';
import CurriculumSectionItemHOC from './CurriculumSectionItemHOC';
import VideoPlayer from '../../components/Jplayer/videoPlayer';
import { Button } from 'element-react';
import InstructorLayout from './InstructorLayout';
class UpdateCourseCurriculum extends Component {
    constructor(props) {
        super(props);
		
        this.state = {
			curriculum: {
                sections: [
                ]
            }
        };
	}

    /*addSection = (e) => {
        e.preventDefault();
        alert('add section');
        let currentCurriculum = {...this.state.curriculum};
        let currentSections = [
                                ...currentCurriculum.sections,
                                { 
                                    title: 'enter your section tile', 
                                    description: 'desc for your section',
                                    lessions:[
                                        { name:'lession 31', content: 'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v'}
                                    ]
                                }
                              ]
        currentCurriculum.sections = currentSections;
        console.log('currentCurriculum');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});

    }*/

    deleteLession = (sectionIndex,lessionIndex) => {
        alert('delete section:'+sectionIndex);
        alert('delete lession:'+lessionIndex);
        let currentCurriculum = {...this.state.curriculum};
        let currentSections = [
            ...currentCurriculum.sections
        ];
        console.log(currentSections);
        let currentLessions= [
            ...currentSections[sectionIndex].props.lessions
        ];
        
        let updatedCurrentLession= currentLessions.filter(item=> {
            return item.id!==parseInt(lessionIndex)
        });
        console.log('lessions after delete...');
        console.log(updatedCurrentLession);

        let updatedCurrentSection= currentSections.map(item=> {
            console.log(item);
           alert('item.props.id : '+item.props.id);
            alert('indexSectionFound : '+ sectionIndex);
           // alert('lession  : '+ item.props.lessions.length);
             // alert('iterate j=='+j);
              //  alert('item.props.id:'+item.props.id);
                if(parseInt(item.props.id)===parseInt(sectionIndex)) {
                    alert('xxxxxxxxxx'+item.props.id);
                    return <CurriculumSectionItemHOC
                            key={sectionIndex}
                            id={sectionIndex}
                            section_title={item.props.section_title} 
                            noOfSections={currentSections.length} 
                            lessions = {updatedCurrentLession}
                            onDeleteSection={(indexSectionFound) => this.deleteSection(indexSectionFound)}
                            onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
                            onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                            onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
                        />
                }
                else{
                    return item;
                }
            
            
                
                
            
            
        })

        console.log('current section,,,,');
        console.log(updatedCurrentSection);


        currentCurriculum.sections = updatedCurrentSection;
        console.log('end update section title');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});
    }

    componentDidMount() {
        this.props.loadCourseCurriculum("5cc6b7f7fe71713474d6c760");
    }

    componentWillReceiveProps(nextProps) {
        console.log('receive props');
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
        let arrays = [];
        
        for (var i = 0; i < sectionArray.length; i++) {
            arrays.push( <CurriculumSectionItemHOC
                key={i}
                id={i}
                section_title={sectionArray[i].title} 
                noOfSections={sectionArray.length} 
                lessions = {sectionArray[i].lessions}
                onDeleteSection={(id) => this.deleteSection(id)}
                onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
                onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
           />)
        }

        currentCurriculum.sections = arrays;
        //console.log(arrays);
        this.setState({curriculum: currentCurriculum});

    }
    componentWillMount() {
       
        /*let currentCurriculum = {...this.state.curriculum};
        let sectionArray = [];
        for (var i = 0; i < 1; i++) {

            let lessionArray = [];
            //for (var j = 0; j < 2; j++) {
                let newLession1 =  { 
                    id: 0,
                    name:'lession 11', 
                    content: 'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v'
                }
                lessionArray.push(newLession1);
                
                let newLession2 =  { 
                    id: 1,
                    name:'lession 12', 
                    content: 'http://techslides.com/demos/sample-videos/small.ogv'
                }
                lessionArray.push(newLession2);
            //}

            let newSection =  
                               { 
                                    title: 'This is test section', 
                                    description: 'desc for test section',
                                    lessions:lessionArray
                                }
                            
            sectionArray.push(newSection);
        }

        
        //currentCurriculum.sections = sectionArray;
        //alert('currentCurriculum');
        //console.log(currentCurriculum);
        //this.setState({curriculum: currentCurriculum});

        let arrays = [];
        
        for (var i = 0; i < sectionArray.length; i++) {
            arrays.push( <CurriculumSectionItemHOC
                key={i}
                id={i}
                section_title={sectionArray[i].title} 
                noOfSections={sectionArray.length} 
                lessions = {sectionArray[i].lessions}
                onDeleteSection={(id) => this.deleteSection(id)}
                onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
                onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
           />)
        }

        currentCurriculum.sections = arrays;
        this.setState({curriculum: currentCurriculum});*/
    }

    updateCourseCurriculum = () => {
        alert('update course curriculum');
        console.log(this.state.curriculum);
        const sections = this.state.curriculum.sections;
        const finalSections = sections.map(item=> {
            const itemSection = {
                section_title: item.props.section_title,
                lessions: item.props.lessions
            }
            return itemSection;
        });
        console.log(finalSections);
        for(var j=0;j<finalSections.length;j++)
        {
            this.props.updateCourseCurriculum("5cc6b7f7fe71713474d6c760",finalSections[j]);
        }
    }
    
    deleteSection = (sectionIndex) => {
        alert('delete section :'+sectionIndex);
        let currentCurriculum = {...this.state.curriculum};
        let currentSections = [
            ...currentCurriculum.sections,
            
        ];

        let updatedCurrentSections= currentSections.filter(item=> {
            return item.props.id!==sectionIndex
        });

        console.log('currentSections');
        console.log(updatedCurrentSections);


        currentCurriculum.sections = updatedCurrentSections;
        console.log('end update section title');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});
    }

    updateSectionTitle = (section_content) => {
        alert('section tilte : '+section_content.section_title);
        let currentCurriculum = {...this.state.curriculum};
        console.log('currentCurriculum.................................');
        console.log(currentCurriculum);
        let currentSections = [
                                ...currentCurriculum.sections,
                                
                              ];
        console.log('currentSections.................................');
        console.log(currentSections);
        let indexSectionFound=0;
        for (var i = 0; i < currentSections.length; i++) {
            if(i==section_content.section_index) {
                alert('this section'+i);
                //currentSections[i].props.section_title = section_content.section_title;
                indexSectionFound=i;
            }
        }

        let updatedCurrentSection= currentSections.map(item=> {
            console.log(item);
            alert('item.props.idzzz : '+item.props.id);
            alert('indexSectionFound : '+ indexSectionFound);
            if(parseInt(item.props.id)===parseInt(indexSectionFound)) {
                
                alert(section_content.section_title);
                return <CurriculumSectionItemHOC
                            key={indexSectionFound}
                            id={indexSectionFound}
                            section_title={section_content.section_title} 
                            noOfSections={currentSections.length} 
                            lessions = {currentSections[indexSectionFound].props.lessions}
                            onDeleteSection={(indexSectionFound) => this.deleteSection(indexSectionFound)}
                            onLessionChange123={(sectionIndex,lessionContent) => this.updateLessionContent(sectionIndex,lessionContent)} 
                            onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                            onDeleteLession={(sectionIndex,lessionIndex) => this.deleteLession(sectionIndex,lessionIndex)}
                />
            }
            else {
                return item;
            }
        })
      

        console.log('currentSections');
        console.log(updatedCurrentSection);


        currentCurriculum.sections = updatedCurrentSection;
        console.log('end update section title');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});
    }

    updateLessionContent = (section_index,lession) => {
        alert('lession index in  update curri:'+ lession.lession_index);
        //alert('lession type in update curri:'+ lession.lession_type);
        //alert('lession content in  update curri:'+ lession.lession_content);
        var lession_index = lession.lession_index;
        let currentCurriculum = {...this.state.curriculum};
        console.log('currentCurriculum.................................');
        console.log(currentCurriculum);
        let currentSections = [
                                ...currentCurriculum.sections
                              ];

        for (var i = 0; i < currentSections.length; i++) {
            if(parseInt(i)===parseInt(section_index)) {
                alert('this section'+i);
                let isFoundLession = "0";
                for (var j= 0; j < currentSections[i].props.lessions.length; j++) {
                    if(parseInt(j)===parseInt(lession_index))
                    {
                        isFoundLession="1";
                        alert('this lession'+j+'- '+lession.lession_title + "-"+ lession.lession_content);
                        let currentLession = {
                            id: j,
                            name: lession.lession_title,
                            content: lession.lession_content,
                        };
                        currentSections[i].props.lessions[lession_index] = currentLession;
                    }
                }
                alert('isFoundLession='+isFoundLession);
                if(isFoundLession==="0") {
                    alert('add new lession: '+currentSections[section_index].props.lessions.length);
                    let currentLession = {
                        id: currentSections[i].props.lessions.length,
                        name: lession.lession_title,
                        content: lession.lession_content
                    };
                    currentSections[i].props.lessions[lession.lession_index] = currentLession;
                }
            }
        }

        currentCurriculum.sections = currentSections;
        console.log('end update lession content');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});
    }

    addSection = () => {
        alert('add section');
        let currentCurriculum = {...this.state.curriculum};
        console.log('currentCurriculum.................................');
        console.log(currentCurriculum);
        let newSectionIndex = parseInt(currentCurriculum.sections.length);
        alert('newSectionIndex:'+newSectionIndex);
        const newSectionTitle = "your section title";
        const lessions=[];
        const newLesionIndex=0;
        let currentSections = [
            ...currentCurriculum.sections,
            <CurriculumSectionItemHOC
                    key={newSectionIndex}
                    id={newSectionIndex}
                    section_title={newSectionTitle} 
                    noOfSections={currentCurriculum.sections.length} 
                    lessions = {lessions}
                    onDeleteSection={(newSectionIndex) => this.deleteSection(newSectionIndex)}
                    onLessionChange123={(newSectionIndex,lession_content) => this.updateLessionContent(newSectionIndex,lession_content)} 
                    onSectionChange={(section_content)=>this.updateSectionTitle(section_content)}
                    onDeleteLession={(newSectionIndex,newLesionIndex) => this.deleteLession(newSectionIndex,newLesionIndex)}
            />
                    
        ];
        
        currentCurriculum.sections = currentSections;
        console.log('end update lession content');
        console.log(currentCurriculum);
        this.setState({curriculum: currentCurriculum});
    }

    render() {
        let x1 =  this.state.curriculum.sections.map(item => {
            return item;
        })
        //   console.log(this.state.curriculum.sections);
        return (
            <InstructorLayout {...this.props}>
			<div>
               {/* <VideoPlayer id="VideoPlayer" m4vURL="http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v" />;

                <CurriculumSectionHOC 
                    key={i}
                    noOfSections={this.state.curriculum.sections.length} 
                    sections={this.state.curriculum.sections} 
                    onLessionChange={(lession_content) => this.updateLessionContent(lession_content)} 
                />*/}
           {x1}
                <div style={{marginTop:'20px', marginBottom:'20px'}}>
                <Button onClick={() => this.addSection()} size="large" type="success">Add section</Button>
                <Button onClick={(e) => this.updateCourseCurriculum(e)} size="large"  type="success">Save curriculum</Button>
                    {/*<CustomizeButton onClick={(e) => this.updateCourseCurriculum(e)} style={{marginRight:'5px'}} text="Save curriculum" />*/}
                </div>
			</div>
            </InstructorLayout>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
      return {
          curriculum : state.courses.curriculum
      };
  }

const mapDispatchToProps = dispatch => ({
    updateCourseCurriculum: (id,course) => dispatch(updateCourseCurriculum(id,course)),
    loadCourseCurriculum: id => dispatch(loadCourseCurriculum(id))
});

export default hoc(UpdateCourseCurriculum, mapStateToProps,mapDispatchToProps);
