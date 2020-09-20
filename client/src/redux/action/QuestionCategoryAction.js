import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadQuestionCategorySuccess = (data) => {
    //console.log('in action2: ',data);
    return {
        type: actionTypes.LOAD_QUESTION_CATEGORIES_SUCCESS,
        payload: data
    }
}

export const loadQuestionCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/question_categories',{withCredentials: true})
            .then(res => {
                //console.log('in action:',res.data);
                dispatch(loadQuestionCategorySuccess(res.data));
            }).catch(error => {

            });
    }
}

export const deleteQuestionCategorySuccess = (questionCategoryID) => {
    return {
        type: actionTypes.DELETE_QUESTION_CATEGORY_SUCCESS,
        payload: questionCategoryID
    }
}

export const deleteQuestionCategory = (questionCategoryID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/question_categories/'+questionCategoryID,{withCredentials: true})
            .then(res => {
                dispatch(deleteQuestionCategorySuccess(questionCategoryID));
            }).catch(error => {

            });
    }
}

export const createQuestionCategorySuccess = (data) => {
    return {
        type: actionTypes.CREATE_QUESTION_CATEGORY_SUCCESS,
        payload : data
    }
}

export const createQuestionCategory = (questionCategory) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/question_categories/',questionCategory,{withCredentials: true})
            .then(res => {
                //console.log('result from api');
                //console.log(res.data);
                dispatch(createQuestionCategorySuccess(res.data));
            }).catch(error => {

            });
    }
}

export const updateQuestionCategorySuccess = (id,data) => {
    return {
        type: actionTypes.UPDATE_QUESTION_CATEGORY_SUCCESS,
        id,
        payload : data
    }
}

export const updateQuestionCategory = (id,questionCategory) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/question_categories/'+id,questionCategory,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate question category');
                //console.log(res.data);
                //console.log(id);
                dispatch(updateQuestionCategorySuccess(id,res.data.questionCategory));
            }).catch(error => {

            });
    }
}