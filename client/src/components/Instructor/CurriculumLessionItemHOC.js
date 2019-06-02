import React, {Component} from 'react';
import {post} from 'axios';
import { hoc } from '../hoc/hoc';
import CKEditor from "react-ckeditor-component";
import VideoPlayer from '../../components/Jplayer/videoPlayer';
import { actions } from 'react-jplayer';
// Styles the jPlayer to look nice
import 'react-jplayer/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import 'react-jplayer/src/less/controls/iconControls.less';
import { Button,Upload, Input } from 'element-react';
import 'element-theme-default';
import { flattenProp } from 'recompose';

class CurriculumLessionItemHOC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            content: 'abc',
            lessionContent : {
                lession_index: 0,
                lession_type: 0, /* 0: lession's content is text, 1: video url */
                lession_title: '',
                lession_content:''                
            },
            display_lession_video:0 /* 0: display lession video, 1: display lession text */,
            display_component:'true'/* 0: display , 1: hide */,
            display_lession_title_input: false
        };

        this.onChange = this.onChange.bind(this);
        this.createImage = this.createImage.bind(this);
	}

    onChange(evt){
        //console.log("onChange fired with event info: ", evt);
        var newContent = evt.editor.getData();
        //alert('this.props.lession_index,,,,,, : '+this.props.lession_index);
        //alert('newContent,,,,,, : '+newContent);
        this.setState({content: newContent});
        const lessionContent = {
            lession_index: this.props.lession_index,
            lession_type: 0, /* 0: lession's content is text, 1: video url */
            lession_content:newContent,
            lession_title: this.state.lessionContent.lession_title
        }
        const sectionIndex = this.props.id;
        alert('sectionIndex:'+sectionIndex);
        this.setState({lessionContent});
        this.props.onLessionChange(sectionIndex,lessionContent);
    }

    handleRemove = (file, fileList) => {
        //alert('remove from list');
        console.log(file, fileList);
    }

    chooseLessionContentTextType = (e) => {
        alert('choose lession text type'+ this.state.content);
        //this.setState({display_lession_video: 1});
        alert('this.state.lessionContent.lession_title:'+this.state.lessionContent.lession_title);
        const lessionContent = {
            lession_index: this.state.lessionContent.lession_index,
            lession_type: 0, /* 0: lession's content is text, 1: video url */
            lession_content:this.state.content,
            lession_title:this.state.lessionContent.lession_title
        }
        this.setState({display_lession_video: 1});
        const sectionIndex = this.props.id;
        alert('sectionIndex:'+sectionIndex);
        this.setState({lessionContent});
        this.props.onLessionChange(sectionIndex,lessionContent);
    }

    chooseLessionContentVideoType = (e) => {
        alert('choose lession video type');
        this.setState({display_lession_video: 0});
    }

    handlePreview(file) {
        console.log(file);
    }

    handleChange = (file, fileList) => {
        alert('on changexx');
        console.log(file);
        console.log(fileList);
        console.log('file name: '+file.raw.name);
        console.log(file.raw);
        this.createImage(file.raw);
    }
    
    fileUpload(image,fileName){
		console.log('file upload');
		//console.log(image);
		const url = 'http://localhost:3004/api/upload_file';
        //const formData = {file: image,filename:fileName}
        const formData = {file: image,filename:fileName}
		return  post(url, formData)
				.then(response => {
                        let media = ""; 
                        console.log('file response....'+ response);
                        console.log( response);
					    //console.log('file response....'+ this.state.image);
                        let urlResponse = response.data.url;
                        alert('urlResponse : '+urlResponse);
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
                        //console.log('media : '+media);
                        //this.props.setMedia('jplayer_'+this.props.id, media);
                        //alert('video url:'+response.data.content);
                        //alert('this.props.lession_index:'+this.props.lession_index);
                        //alert('this.props.lession_title:'+this.props.lession_title);
                        alert('this.state.lessionContent.lession_title:'+this.state.lessionContent.lession_title);
                        const lessionContent = {
                            lession_index: this.props.lession_index,
                            lession_type: 1, /* 0: lession's content is text, 1: video url */
                            lession_content:response.data.url,
                            lession_title: this.state.lessionContent.lession_title
                        }
                        this.setState({lessionContent});
                        const sectionIndex =this.props.section_index;
                        alert('sectionIndex: '+sectionIndex);
                        this.props.onLessionChange(sectionIndex,lessionContent);
                        //this.setState({image: response.data.url});
                    }
				)
    }

    createImage(file) {
      //alert('create image');
      let reader = new FileReader();
      reader.onload = (e) => {
		console.log('picture result');
		console.log(e.target.result);
        this.setState({image: e.target.result })
        this.fileUpload(e.target.result,file.name);
      };
      reader.readAsDataURL(file);
    }

    changeLessionTitle = (value) => {
        let lessionContent = {...this.state.lessionContent };
        lessionContent['lession_title'] = value;
        console.log(value);
        this.setState({lessionContent});
    }

    showChangeLessionTitle = () => {
        this.setState({
            display_lession_title_input: !this.state.display_lession_title_input
        })
    }

    saveChangeLessionTitle = () => {
        this.setState({
            display_lession_title_input: !this.state.display_lession_title_input
        })
        console.log('save new lesstion title/......');
        console.log(this.state.lessionContent);
        const sectionIndex = this.props.section_index;
        alert('section index='+sectionIndex);
        this.props.onLessionChange(sectionIndex,this.state.lessionContent);
    }

    showHide = () => {
        //alert('show hide');
        if(this.state.display_component == 'false')
        {
            this.setState({display_component: 'true'});
        }
        else
        {
            this.setState({display_component: 'false'});
        }
    }


    componentWillMount() {
        if(this.props.isHidden == 'true')
        {
            this.setState({display_component: 'false'});
        }

        const lessionContent = {
            lession_index: this.props.lession_index,
            lession_type: 0, /* 0: lession's content is text, 1: video url */
            lession_content:this.props.lession_content,
            lession_title: this.props.lession_title
        }

        this.setState({ lessionContent });
    }

    render() {
       
        //alert('this.props.id = '+this.props.id);
        //alert('this.props.isHidden = '+this.props.lession_content);
      
        //let videoComponent =   <VideoPlayer id={`jplayer_${this.props.id}`} m4vURL={this.props.lession_content} />;
        //if(this.state.image != "") {
        //    alert('hereyyy');
        //    videoComponent =   <VideoPlayer id={`jplayer_${this.props.id}`} m4vURL={this.state.image} />;
        //}

        const fileList2 = [];
        return (
			<div style={{ marginBottom:'20px' }} className='divCourseLession'>
                <div style={{display:this.state.display_lession_title_input==false?'inline-block':'none'}}>
                    <label  className="lblSectionTitle">{this.state.lessionContent.lession_title} </label>
                    <Button style={{marginBottom:'20px'}} onClick={() => this.showChangeLessionTitle()} size="small" type="warning">Change</Button>
                    <Button onClick={() => this.props.onDeleteLession(this.props.id)} size="small" type="danger">Delete lession</Button>
                </div>
                
                <div style={{display:this.state.display_lession_title_input==true?'inline-block':'none'}}>
                    <Input  onChange={(event) => this.changeLessionTitle(event)} style={{width:'150px'}} placeholder="Please input" value={this.state.lessionContent.lession_title} />
                    <Button style={{marginBottom:'20px'}} onClick={() => this.saveChangeLessionTitle()} size="small" type="warning">Save</Button>
                </div>
                
                <Button style={{marginLeft:'20px',marginBottom:'20px'}} onClick={() => this.showHide()} size="small" type="warning">Show/Hide</Button>
                <br />
                <div className="lession-content-type" style={{display:this.state.display_component=='true'?'inline-block':'none'}}>
                    <input type="radio" id={`radLessionTextType_${this.props.id}`} checked={this.state.display_lession_video==1?'checked':''} onChange={(e) => this.chooseLessionContentTextType(e)} name={`lession_content_type_${this.props.id}`} value="text" /> Text&nbsp;
                    <input type="radio" id={`radLessionVideoType_${this.props.id}`} checked={this.state.display_lession_video==0?'checked':''} onChange={(e) => this.chooseLessionContentVideoType(e)} name={`lession_content_type_${this.props.id}`} value="video" /> Video
                </div>
                <br />
                
                <div style={{display:this.state.display_component=='true'?'inline-block':'none'}}>
                    <div className="lession-text" style={{display:this.state.display_lession_video==1?'inline-block':'none'}}>
                        <CKEditor 
                                activeClass="myCKEditor" 
                                content={this.state.content} 
                                events={{"change": this.onChange }}
                        />
                    </div>

                    <div className="video-player" 
                        style={{display:this.state.display_lession_video==0?'inline-block':'none'}}>
                        <Upload
                            name="myFile"
                            className="upload-demo"
                            action="http://localhost:3004/api/upload_file/"
                            onPreview={file => this.handlePreview(file)}
                            onRemove={(file, fileList2) => this.handleRemove(file, fileList2)}
                            onChange={(file, fileList2) => this.handleChange(file, fileList2)}
                            fileList={fileList2}
                            listType="picture"
                            tip={<div className="el-upload__tip"></div>}
                            >
                            <Button size="small" type="primary">Click to upload</Button>
                        </Upload>
                      
                 
                    </div>
                </div>


            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
	setMedia: (id,media) => dispatch(actions.setMedia(id,media)),
});

const mapStateToProps = state => {
    
    if(state.jPlayers.VideoPlayer != null)
    {
        //alert('mpa');
        console.log(state.jPlayers.VideoPlayer);
        return {
            showRemainingDuration: state.jPlayers.VideoPlayer.showRemainingDuration
        }
    }
    else {
        return {
            showRemainingDuration: '10'
        }
    }
};

export default hoc(CurriculumLessionItemHOC, mapStateToProps,mapDispatchToProps);