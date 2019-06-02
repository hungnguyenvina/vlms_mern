import React from 'react';
import { createCourse, loadLessionByLessionID } from '../../redux/action/CourseAction';
import { hoc } from '../hoc/hoc';
import { actions } from 'react-jplayer';
import { Redirect } from 'react-router';
import UIInput from '../UI/UIInput';
import { Form, Button } from 'element-react';
import VideoPlayer from '../../components/Jplayer/videoPlayer';
import UserLayout from './UserLayout';
class TakeCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			videoPlayer:'' 
        };
	}

	componentDidMount() {
        //alert('did mount');
        //const courseID = this.props.match.params.id;
        //alert(courseID);
		const lessionID = this.props.match.params.lession_id;
	    this.props.loadLessionByLessionID(lessionID);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
        const oldLessionID = this.props.match.params.lession_id;
        const newLessionID = nextProps.match.params.lession_id;
        //alert('this lession id : '+this.props.match.params.lession_id);
        //alert('nexprops lession id : '+nextProps.match.params.lession_id);
		//nextProps.loadLessionByLessionID(lessionID);

		console.log("will receive propsxxxxxxxxxxxxxx");
        console.log(nextProps);
        if(oldLessionID === newLessionID) {
            //alert('the same');
        }
        else{
            //alert('not the same');
            nextProps.loadLessionByLessionID(newLessionID);
        }
		const currentLession =nextProps.lession[0];
		const lessionContent = currentLession.content;
		//alert('lession content: '+lessionContent);
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
                        console.log('media : '+media);
                        this.props.setMedia('VideoPlayer', media);
        //}
												
	}
    render() {
		return ( 
            <UserLayout {...this.props}>
                <React.Fragment>
                    <VideoPlayer id="VideoPlayer" m4vURL="http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v" />
                </React.Fragment>
            </UserLayout>
		)
    }
}


const mapStateToProps = state => {
		return {
			lession : state.courses.lession
		};
}

const mapDispatchToProps = dispatch => ({
	loadLessionByLessionID: id => dispatch(loadLessionByLessionID(id)),
	setMedia: (id,media) => dispatch(actions.setMedia(id,media))
});

export default hoc(TakeCourse, mapStateToProps,mapDispatchToProps);