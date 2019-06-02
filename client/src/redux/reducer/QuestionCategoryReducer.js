import * as actionType from '../action/actionTypes';

const initialState = {
    question_categories: [],
    course_categories: []   
};

export const QuestionCategoryReducer = (state = initialState.question_categories,action) => {
    switch(action.type) {
        case actionType.LOAD_QUESTION_CATEGORIES_SUCCESS :
            console.log('payload'+ action.payload);
            const newState1 = [
                ...state,
                ...action.payload
                ];
            console.log('after state'+ newState1);
            //return newState1;
            return action.payload;
        case actionType.CREATE_QUESTION_CATEGORY_SUCCESS :
            console.log(action.payload);
            return [
                ...state,
                action.payload
            ]
        case actionType.UPDATE_QUESTION_CATEGORY_SUCCESS :
            console.log('reducer update question category.....');

            const categoryQuestionIDUpdate = action.id;
            console.log(action.id);
            console.log('categoryQuestionIDUpdate'+ categoryQuestionIDUpdate);
    
            const newState = state.filter(item => item._id !== categoryQuestionIDUpdate);
            console.log('newState');
            console.log(newState);
            console.log('action.payload');
            console.log(action.payload);
            return [
                ...newState,
                action.payload
            ]
        case actionType.DELETE_QUESTION_CATEGORY_SUCCESS :
            const categoryQuestionID = action.payload;
            console.log('delete question category id: '+ categoryQuestionID);
            return state.filter(item => item._id !== categoryQuestionID);
        default : 
            return state;
    }
}