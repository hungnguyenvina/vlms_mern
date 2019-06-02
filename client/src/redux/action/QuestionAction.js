import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadQuestionSuccess = (data) => {
    return {
        type: actionTypes.LOAD_QUESTIONS_SUCCESS,
        payload: data
    }
}

export const loadQuestions = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/questions')
            .then(res => {
                console.log(res.data);
                dispatch(loadQuestionSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadSingleQuestionSuccess = (data) => {
    return {
        type: actionTypes.LOAD_SINGLE_QUESTION_SUCCESS,
        payload: data
    }
}

export const loadSingleQuestion = (questionID) => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/question/'+questionID)
            .then(res => {
                console.log(res.data);
                dispatch(loadSingleQuestionSuccess(res.data));
            }).catch(error => {
        });
    }
}

export const createQuestionSuccess = (data) => {
    return {
        type: actionTypes.CREATE_QUESTION_SUCCESS,
        payload : data
    }
}

export const createQuestion = (question) => {
    return (dispatch) => {
        axios.post('http://localhost:8000/api/question/',question)
            .then(res => {
                //console.log(res.data);
                dispatch(createQuestionSuccess(res.data.data));
            }).catch(error => {

            });
    }
}

export const deleteQuestionSuccess = (questionID) => {
    return {
        type: actionTypes.DELETE_QUESTION_SUCCESS,
        payload: questionID
    }
}

export const deleteQuestion = (questionID) => {
    return (dispatch) => {
        axios.delete('http://localhost:8000/api/question/'+questionID)
            .then(res => {
                dispatch(deleteQuestionSuccess(questionID));
            }).catch(error => {

            });
    }
}

export const updateQuestionSuccess = (id,data) => {
    return {
        type: actionTypes.UPDATE_QUESTION_SUCCESS,
        id,
        payload : data
    }
}

export const updateQuestion = (id,question) => {
    return (dispatch) => {
        axios.put('http://localhost:8000/api/question/'+id,question)
            .then(res => {
                console.log(res.data);
                dispatch(updateQuestionSuccess(id,res.data.data));
            }).catch(error => {

            });
    }
}

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
                console.log(res.data);
                dispatch(loadQuestionCategoriesOptionsHTMLSuccess(res.data));
            }).catch(error => {

            });
    }
}