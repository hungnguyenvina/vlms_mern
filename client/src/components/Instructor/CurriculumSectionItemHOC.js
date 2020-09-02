import React, {Component} from 'react';
import axios,{post} from 'axios';
import QuestionImage from '../../images/question.png'
import {connect} from 'react-redux';
import { updateUserProfile } from '../../redux/action/UserAction';
import InputForm from '../../components/UI/InputForm';
import renderHTML from 'react-render-html';
import { hoc } from '../hoc/hoc';
import CustomizeButton from '../UI/CustomizeButton';
import CKEditor from "react-ckeditor-component";
import VideoPlayer from '../../components/Jplayer/videoPlayer';
import { reducer as jPlayers } from 'react-jplayer';
import { actions } from 'react-jplayer';
import CurriculumLessionItemHOC from './CurriculumLessionItemHOC';
import CurriculumSectionItemHOCCSS from './CurriculumSectionItemHOC.css';
// Styles the jPlayer to look nice
import 'react-jplayer/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import 'react-jplayer/src/less/controls/iconControls.less';
import { Button,Input } from 'element-react';
import 'element-theme-default';
class CurriculumSectionItemHOC extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = {
            image: '',
            current:'a',
            display_lession_video:1 /* 0: display lession video, 1: display lession text */,
            display_section_title_input: false,
            sectionContent : {
                section_index: 0,
                section_title: ''        
            },
        };

        //this.createImage = this.createImage.bind(this);
	}

    onChange(evt){
      console.log("onChange fired with event info: ", evt);
      var newContent = evt.editor.getData();
      //alert('newContent : '+newContent);
    }

    handleRemove = (file, fileList) => {
        //alert('remove from list');
        console.log(file, fileList);
    }

    handlePreview(file) {
        console.log(file);
    }

    submitUpload() {
        //alert('upload');
        this.refs.upload.submit();
    }

    handleChange = (file, fileList) => {
        //alert('on changexx');
        //console.log(file);
        //console.log(fileList);
        //console.log('file name: '+file.raw.name);
        //console.log(file.raw);
        this.createImage(file.raw);
    }

    getVideoDuration = () => {
        //alert('get video duration');

        for(let key in this.props.video_duration_text) {
			console.log(key);
            if(this.props.video_duration_text[key].durationText)
            {
             //console.log('video duration text =' + this.props.video_duration_text[key].durationText);
            }
		}
    }

    fileUpload(image,fileName){
		//console.log('file upload');
		//console.log(image);
		const url = 'http://localhost:8000/api/fileupload';
		const formData = {file: image,filename:fileName}
		return  post(url, formData)
				.then(response => {
                        let media = ""; 
					    //console.log('file response....'+ this.state.image);
                        let urlResponse = response.data.content;
                        //alert('urlResponse : '+urlResponse);
                        var indexMP4 = urlResponse.endsWith("mp4");
                        var indexWEBMV = urlResponse.endsWith("webm");
                        var indexOGV = urlResponse.endsWith("ogv");
                        if(indexMP4 > 0)
                        {
                            media = 
                            {
                                // sources: {ogv: 'http://techslides.com/demos/sample-videos/small.ogv'},
                                sources: {
                                    m4v: urlResponse
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
                                    webmv: urlResponse
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
                                    ogv: urlResponse
                                }, 
                                title: null,
                                artist: null,
                                poster: null,
                                free: false,
                                tracks: [],
                            };
                        }

                        //alert('this.props.id : '+this.props.id);
                        //alert('this.state.current : '+this.state.current);
                        //console.log('media : '+media);
                        // console.log(media);

                        this.props.setMedia('jplayer'+this.state.current, media);
                        //this.setState({image: response.data.content});
                    }
				)
    }

    createImage(file) {
      //alert('create image');
      let reader = new FileReader();
      reader.onload = (e) => {
		//console.log('picture result');
		//console.log(e.target.result);
        this.setState({image: e.target.result })
        this.fileUpload(e.target.result,file.name);
      };
      reader.readAsDataURL(file);
    }

    chooseLessionContentTextType = (e) => {
        //alert('choose lession text type');
        this.setState({display_lession_video: 1});
    }

    chooseLessionContentVideoType = (e) => {
        //alert('choose lession video type');
        this.setState({display_lession_video: 0});
    }
    
    changeSectionTitle = (value) => {
        let sectionContent = {...this.state.sectionContent };
        sectionContent['section_title'] = value;
        //console.log(value);
        this.setState({sectionContent});
    }

    addLession = (sectionIndex,noOfLessions) => {
       
        //let lessionID = this.props.id+"_"+this.state.sections.length;
        //console.log('adding lession');
        //console.log(this.state.sections);
        let lessionID = sectionIndex + "_" + noOfLessions;
        //alert('add lesssion'+lessionID);
        const newLessionTitle = 'your new lession name';
        const newLessionContent = '';//'http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v';
        const newLessionIndex = noOfLessions;

        let arrays = [
            ...this.state.sections,
            <CurriculumLessionItemHOC
                            key={lessionID}
                            isHidden="true"
                            id={lessionID}
                            lession_title={newLessionTitle}
							lession_content={newLessionContent}
                            lession_index={newLessionIndex}
                            section_index= {sectionIndex}
                            onDeleteLession={(lessionID) => this.deleteLession(lessionID)} 
                            onLessionChange={(sectionIndex,newLessionContent) => this.updateLessionContent(sectionIndex,newLessionContent)} 
                       />

                       
        ];
   //console.log('here am i');
        //console.log(arrays);
        
        const lessionContent = {
            lession_index: newLessionIndex,
            lession_type: 1, /* 0: lession's content is text, 1: video url */
            lession_content:newLessionContent,
            lession_title: newLessionTitle
        }
        //console.log('lessionContent....');
        //console.log(lessionContent);
        this.props.onLessionChange123(sectionIndex,lessionContent);
        this.setState({sections: arrays});
    }

    showChangeSectionTitle = () => {
        this.setState({
            display_section_title_input: !this.state.display_section_title_input
        })
    }

    saveChangeSectionTitle = () => {
        this.setState({
            display_section_title_input: !this.state.display_section_title_input
        })
        //console.log('save new section title/......');
        //console.log(this.state.sectionContent);
        this.props.onSectionChange(this.state.sectionContent);
    }

    deleteLession = (sectionLessionIndex) => {
        alert('section lession index:'+ sectionLessionIndex);
        const sectionLessionIndexArray = sectionLessionIndex.split('_');
        const sectionIndex= sectionLessionIndexArray[0];
        const lessionIndex= sectionLessionIndexArray[1];
        this.props.onDeleteLession(sectionIndex,lessionIndex);
    }

    updateLessionContent = (sectionIndex,lession_content) => {
        //alert('lession index:'+ lession_content.lession_index);
        //alert('lession type:'+ lession_content.lession_type);
        //alert('lession content:'+ lession_content.lession_content);
        const lessionContent = {
            lession_index: lession_content.lession_index,
            lession_type: lession_content.lession_type, /* 0: lession's content is text, 1: video url */
            lession_content:lession_content.lession_content,
            lession_title: lession_content.lession_title
        }
        //console.log('lession');
        //console.log(lessionContent);
        //console.log('thisssssssssssss.dddđ....');
        //console.log(this.props);
        this.props.onLessionChange123(sectionIndex,lessionContent);
    }
    
    componentWillReceiveProps(nextProps) {
        alert('[CurriculumSectionItemHoc] :compo will receive props');
        console.log('[CurriculumSectionItemHoc] :nextProps');
        console.log(nextProps);
        //console.log('nextProps.lessions:');
        console.log('[CurriculumSectionItemHoc] : nextProps.lessions');
        console.log(nextProps.lessions);

        let arrays = [];
        for (var i = 0; i < nextProps.lessions.length; i++) {
            //alert('nextProps.lessions[i].name = '+nextProps.lessions[i].name);
            //alert('nextProps.lessions[i].content = '+nextProps.lessions[i].content);
            //let lessionID = nextProps.id+"_"+nextProps.lessions[i].id;
            let lessionID = nextProps.id+"_"+i;
            alert('lessionID:'+lessionID);
            let sectionIndex =nextProps.id;
            let lesssionContent = nextProps.lessions[i].content;
            arrays.push( <CurriculumLessionItemHOC
                            key={lessionID}
                            isHidden="true"
                            id={lessionID}
                            lession_title={nextProps.lessions[i].name}
							lession_content={nextProps.lessions[i].content}
                            lession_index={i}
                            section_index={sectionIndex}
                            onDeleteLession={(lessionID) => this.deleteLession(lessionID)} 
                            onLessionChange={(sectionIndex,lesssionContent) => this.updateLessionContent(sectionIndex,lesssionContent)} 
                       />)
        }

        const sectionContent = {
            section_index: nextProps.id,
            section_title: nextProps.section_title
        }

        this.setState({sectionContent:sectionContent, sections: arrays});

    }

    componentWillMount() {
        let arrays = [];
       /* for (var i = 0; i < 1; i++) {
            arrays.push( <CurriculumLessionHOC
                            id={i}
                            section_id = {this.props.id}
                            lessions = {this.props.lessions}
                            noOfLessions={this.props.lessions.length} 
                            onDeleteSection={(event,id) => this.deleteSection(event,id)}
                       />)
        }*/
        for (var i = 0; i < this.props.lessions.length; i++) {
            let lessionID = this.props.id+"_"+i;
            let sectionIndex =this.props.id;
            alert('lessionID'+lessionID);
            arrays.push( <CurriculumLessionItemHOC
                            key={lessionID}
                            isHidden="true"
                            id={lessionID}
                            lession_title={this.props.lessions[i].name}
							lession_content={this.props.lessions[i].content}
                            lession_index={i}
                            section_index={sectionIndex}
                            onDeleteLession={(sectionLessionIndex) => this.deleteLession(sectionLessionIndex)} 
                            onLessionChange={(sectionIndex,lession_content) => this.updateLessionContent(sectionIndex,lession_content)} 
                       />)
        }

        const sectionContent = {
            section_index: this.props.id,
            section_title: this.props.section_title
        }

        this.setState({sectionContent:sectionContent, sections: arrays});
    }

    clickMe = (e) => { 
        e.preventDefault();
        //console.log('clickme');
        //console.log(e.target);
        //alert('e.target.id : '+e.target.id);
        this.setState({current:e.target.id});
    }

    render() {
        alert('CurriculumSectionItemHoc render...');
        
        let x = this.state.sections.map(item => {
                return item;
        });
        /*let videoComponent =   <VideoPlayer id='jplayer1' m4vURL='http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v' />;
        if(this.state.image != "") {
            videoComponent =   <VideoPlayer id='jplayer1' m4vURL={this.state.image} />;
        }

        const fileList2 = [];
        */
		let inputSectionTitleID = `txtSectionTitle_${this.props.id}`;
        let btnSaveSectionTitleID = `btnSaveSectionTitle_${this.props.id}`;
        let btnUpdateSectionTitleID = `btnUpdateSectionTitle_${this.props.id}`;
        let btnDeleteSectionID = `btnDeleteSection_${this.props.id}`;
        let btnCancelUpdateSectionTitle = `btnCancelSectionTitle_${this.props.id}`;
        return (
				<div className="divCourseSection">
                    <div style={{display:this.state.display_section_title_input==false?'inline-block':'none'}}>
                        <label className="lblSectionTitle">{this.props.section_title}</label>
                        <Button style={{marginBottom:'20px'}} onClick={() => this.showChangeSectionTitle()} size="small" type="warning">Change</Button>
                        <Button onClick={() => this.props.onDeleteSection(this.props.id)} size="small" type="danger">Delete section</Button>
                    </div>
                    <div style={{display:this.state.display_section_title_input==true?'inline-block':'none'}}>
                        <Input  onChange={(event) => this.changeSectionTitle(event)} style={{width:'150px'}} placeholder="Please input" value={this.state.sectionContent.section_title} />
                        <Button style={{marginBottom:'20px'}} onClick={() => this.saveChangeSectionTitle()} size="small" type="warning">Save</Button>
                    </div>
                    
                    <div style={{marginBottom:'20px'}}  className="btnAddLessionQuiz">
                   
                    <Button onClick={() => this.addLession(this.props.id,this.state.sections.length)} size="medium" type="primary">Add lession</Button>
                       {/* <CustomizeButton onClick={() => this.addLession()} style={{marginRight:'5px'}} text="Add lession" />&nbsp;&nbsp;
                        <CustomizeButton style={{marginRight:'5px'}} text="Add quiz" />*/}
                    </div>

                  
                  {x}

                    {/* <div className='divCourseLession'>
                        <label className="lblSectionTitle">lession1</label>

                        <div className="lession-content-type">
                            <input type="radio" checked={this.state.display_lession_video===1} onChange={() => this.chooseLessionContentTextType()} name="lession_content_type" value="text" /> Text&nbsp;
                            <input type="radio" checked={this.state.display_lession_video===0} onChange={() => this.chooseLessionContentVideoType()} name="lession_content_type" value="video" /> Video
                        </div>       
                        <div className="lession-text" style={{display:this.state.display_lession_video==1?'inline-block':'none'}}>
                            <CKEditor 
                                    activeClass="myCKEditor" 
                                    content={this.state.content} 
                                    events={{
                                        "change": this.onChange
                                    }}
                                />
                        </div>
                        <div className="video-player" style={{display:this.state.display_lession_video==0?'inline-block':'none'}}>
                            <Upload
                                className="upload-demo"
                                action="http://localhost:8000/api/fileupload/"
                                onPreview={file => this.handlePreview(file)}
                                onRemove={(file, fileList2) => this.handleRemove(file, fileList2)}
                                onChange={(file, fileList2) => this.handleChange(file, fileList2)}
                                fileList={fileList2}
                                listType="picture"
                                tip={<div className="el-upload__tip"></div>}
                                >
                                <Button size="small" type="primary">Click to upload</Button>
                            </Upload>

                            {videoComponent}
                            <Button onClick={() => this.getVideoDuration()} size="small" type="primary">GET VIDEO DURATION</Button>
                        </div>
                    </div>
                    

                    <div className='divCourseLession'>
                        <label className="lblSectionTitle">lession2</label>
                    </div>
                    */}

                </div>
        );
    }
}

/*const mapStateToProps = state => {
    if(state.jPlayers)
    {
	    console.log(state.jPlayers);
        for(let key in state.jPlayers) {
			console.log(key);
            if(state.jPlayers[key].durationText)
            {
             console.log('duration text =' + state.jPlayers[key].durationText);
            }
		}
    }
	return {
	    video_duration_text : state.jPlayers
	};

}

const mapDispatchToProps = dispatch => ({
	setMedia: (id,media) => dispatch(actions.setMedia(id,media)),
});*/
const mapDispatchToProps = dispatch => ({
	setMedia: (id,media) => dispatch(actions.setMedia(id,media))
});

export default hoc(CurriculumSectionItemHOC, null,mapDispatchToProps);