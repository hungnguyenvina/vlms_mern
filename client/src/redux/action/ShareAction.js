import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadQuestionCategoriesOptionsHTMLSuccess = (data) => {
    return {
        type: actionTypes.LOAD_QUESTION_CATEGORIES_OPTIONS_HTML_SUCCESS,
        payload: data
    }
}

export const loadQuestionCategoriesOptionsHTML = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/question_categories/html')
            .then(res => {
                //console.log(res.data);
                dispatch(loadQuestionCategoriesOptionsHTMLSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadCourseCategoriesOptionsHTMLSuccess = (data) => {
    return {
        type: actionTypes.LOAD_COURSE_CATEGORIES_OPTIONS_HTML_SUCCESS,
        payload: data
    }
}

export const loadCourseCategoriesOptionsHTML = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/course_categories/html')
            .then(res => {
                //console.log(res.data);
                dispatch(loadCourseCategoriesOptionsHTMLSuccess(res.data));
            }).catch(error => {

            });
    }
}