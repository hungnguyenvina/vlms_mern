import React, {Component} from 'react';
import axios,{post} from 'axios';
import QuestionImage from '../../images/question.png'
import {connect} from 'react-redux';
import { updateUserProfile } from '../../redux/action/UserAction';
import InputForm from '../../components/UI/InputForm';
import renderHTML from 'react-render-html';
import { hoc } from '../hoc/hoc';
import CustomizeButton from '../UI/CustomizeButton';
import CurriculumSectionItemHOC from './CurriculumSectionItemHOC';

class CurriculumSectionHOC extends React.Component {
    constructor(props) {
        super(props);
		
        this.state = {
			sections:[]
        };
	}

    deleteSection = (e,id) => {
        e.preventDefault();
        //alert('delete section'+id);
        let tmpIndex = 0;
        for (var i = 0; i < this.state.sections.length; i++) {
            const valueOfItem = this.state.sections[i].props.id;
            //alert('valueOfItem:'+valueOfItem);
            if(valueOfItem == id) {
                //alert('herexxxx :'+i);
                tmpIndex=i;

                break;
            }
        }
        //alert('tmpIndex='+tmpIndex);

        let currentSections = [...this.state.sections];
        currentSections.splice(tmpIndex,1);
        this.setState({sections: currentSections});
    }

    componentWillReceiveProps(nextProps) {
        //alert('componentWillReceiveProps inside Curri Section Hoc');
        //alert('nextProps.noOfSections = '+nextProps.noOfSections);
        //alert('this.props.sections.length = '+this.props.sections.length);
        //if(nextProps.noOfSections != this.props.sections.length) {
            //alert('not equal');
            let arrays = [];
            for (var i = 0; i < nextProps.sections.length; i++) {
                alert(nextProps.sections[i].title);
                //alert(nextProps.sections[i].lessions.length);
                arrays.push( <CurriculumSectionItemHOC
                                id={i}
                                noOfSections={nextProps.sections.length} 
                                section_title={nextProps.sections[i].title} 
                                lessions = {nextProps.sections[i].lessions}
                                onDeleteSection={(event,id) => this.deleteSection(event,id)}
                        />)
            }
            
            this.setState({sections: arrays});
        //}
    }

    updateLessionContent = (lession_content) => {
        //alert('lession index in curri section:'+ lession_content.lession_index);
        //alert('lession type in curri section:'+ lession_content.lession_type);
        //alert('lession content in curri section:'+ lession_content.lession_content);
        const lessionContent = {
            lession_index: lession_content.lession_index,
            lession_type: lession_content.lession_type, /* 0: lession's content is text, 1: video url */
            lession_content:lession_content.lession_content
        }
        this.props.onLessionChange(lessionContent);
    }

    componentWillMount() {
        let arrays = [];
        
        for (var i = 0; i < this.props.sections.length; i++) {
            arrays.push( <CurriculumSectionItemHOC
                            key={i}
                            id={i}
                            section_title={this.props.sections[i].title} 
                            noOfSections={this.props.sections.length} 
                            lessions = {this.props.sections[i].lessions}
                            onDeleteSection={(event,id) => this.deleteSection(event,id)}
                            onLessionChange123={(lession_content) => this.updateLessionContent(lession_content)} 
                       />)
        }
        this.setState({sections: arrays});
    }

    render() {
        return (
            this.state.sections.map(item => {
                return item;
            })
            
        );;
    }
}

export default hoc(CurriculumSectionHOC, null,null);