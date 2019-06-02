import * as actionType from '../action/actionTypes';

const initialState = {
    one_question_per_page_quizzes: [],
    one_question_per_page_quiz:{},
    user_one_question_per_page_quizzes: []
};

export const OneQuestionPerPageQuizReducer = (state = initialState.one_question_per_page_quizzes,action) => {
    switch(action.type) {
        case actionType.LOAD_ONE_QUESTION_PER_PAGE_QUIZZES_SUCCESS :
            console.log('payload one_question_per_page_quizzes:'+ action.payload.data);
            return {
                ...state,
                one_question_per_page_quizzes: action.payload.data
            }
        case actionType.LOAD_SINGLE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS :
            return {
                ...state,
                one_question_per_page_quiz: action.payload.data[0]
            }
        case actionType.USER_LOAD_ONE_QUESTION_PER_PAGE_QUIZZES_SUCCESS :
            return {
                ...state,
                user_one_question_per_page_quizzes: action.payload.data
            }
        case actionType.CREATE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS :
            console.log(action.payload);
            return [
                ...state,
                action.payload
            ]
        case actionType.UPDATE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS :
            const quizIDUpdate = parseInt(action.id);
            console.log('quizIDUpdate'+ quizIDUpdate);
            console.log(action.payload);
            console.log(state);
            const newState = state.filter(item => item.id !== quizIDUpdate);
            console.log(newState);
            return [
                ...newState,
                action.payload
            ]
        case actionType.DELETE_ONE_QUESTION_PER_PAGE_QUIZ_SUCCESS :
            const quizIDDelete = parseInt(action.payload);
            console.log('quizIDDelete'+ quizIDDelete);
            return {
                ...state,
                one_question_per_page_quizzes: state.one_question_per_page_quizzes.filter(item => item.quiz_id !== quizIDDelete)
            }
            //return state.one_question_per_page_quizzes.filter(item => item.quiz_id !== quizIDDelete);
        default : 
            return state;
    }
}