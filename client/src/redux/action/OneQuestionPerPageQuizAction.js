import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadOneQuestionPerPageQuizzesSuccess = (data) => {
    return {
        type: actionTypes.LOAD_ONE_QUESTION_PER_PAGE_QUIZZES_SUCCESS,
        payload: data
    }
}

export const loadOneQuestionPerPageQuizzes = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/one_question_per_page_quizzes')
            .then(res => {
                console.log(res.data);
                dispatch(loadOneQuestionPerPageQuizzesSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadOneQuestionPerPageQuizSuccess = (data) => {
    return {
        type: actionTypes.LOAD_SINGLE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS,
        payload: data
    }
}

export const loadOneQuestionPerPageQuizzesOfUsers = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/user/one_question_per_page_quizzes')
            .then(res => {
                console.log(res.data);
                dispatch(loadOneQuestionPerPageQuizOfUserSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadOneQuestionPerPageQuizOfUserSuccess = (data) => {
    return {
        type: actionTypes.USER_LOAD_ONE_QUESTION_PER_PAGE_QUIZZES_SUCCESS,
        payload: data
    }
}

export const loadSingleOneQuestionPerPageQuiz = (quizID) => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/one_question_per_page_quiz/'+quizID)
            .then(res => {
                console.log(res.data);
                dispatch(loadOneQuestionPerPageQuizSuccess(res.data));
            }).catch(error => {
        });
    }
}

export const createOneQuestionPerPageQuizSuccess = (data) => {
    return {
        type: actionTypes.CREATE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS,
        payload : data
    }
}

export const createOneQuestionPerPageQuiz = (quiz) => {
    return (dispatch) => {
        axios.post('http://localhost:8000/api/one_question_per_page_quiz/',quiz)
            .then(res => {
                //console.log(res.data);
                dispatch(createOneQuestionPerPageQuizSuccess(res.data.data));
            }).catch(error => {

            });
    }
}

export const updateOneQuestionPerPageQuizSuccess = (id,data) => {
    return {
        type: actionTypes.UPDATE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS,
        id,
        payload : data
    }
}

export const updateOneQuestionPerPageQuiz = (id,quiz) => {
    return (dispatch) => {
        axios.put('http://localhost:8000/api/one_question_per_page_quiz/'+id,quiz)
            .then(res => {
                console.log(res.data);
                dispatch(updateOneQuestionPerPageQuizSuccess(id,res.data.data));
            }).catch(error => {

            });
    }
}

export const deleteOneQuestionPerPageQuizSuccess = (quizID) => {
    return {
        type: actionTypes.DELETE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS,
        payload: quizID
    }
}

export const deleteOneQuestionPerPageQuiz = (quizID) => {
    return (dispatch) => {
        axios.delete('http://localhost:8000/api/one_question_per_page_quiz/'+quizID)
            .then(res => {
                dispatch(deleteOneQuestionPerPageQuizSuccess(quizID));
            }).catch(error => {

            });
    }
}