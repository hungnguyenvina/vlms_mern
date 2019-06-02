import * as actionType from '../action/actionTypes';

const initialState = {
    questions: [],
    question:{}
};

export const QuestionReducer = (state = initialState.questions,action) => {
    switch(action.type) {
        case actionType.LOAD_QUESTIONS_SUCCESS :
            console.log('payload'+ action.payload.data);
            const newState1 = [
                ...state,
                ...action.payload.data
                ];
            console.log('after state'+ newState1);
            //return newState1;
            return {
                ...state,
                questions: action.payload.data
            }
        case actionType.LOAD_SINGLE_QUESTION_SUCCESS :
            return {
                ...state,
                question: action.payload.data[0]
            }
        case actionType.CREATE_QUESTION_SUCCESS :
            console.log(action.payload);
            return [
                ...state,
                action.payload
            ]
        case actionType.UPDATE_QUESTION_SUCCESS :
            const questionIDUpdate = parseInt(action.id);
            console.log('questionIDUpdate'+ questionIDUpdate);
            console.log(action.payload);
            console.log(state);
            const newState = state.filter(item => item.id !== questionIDUpdate);
            console.log(newState);
            return [
                ...newState,
                action.payload
            ]
        case actionType.DELETE_QUESTION_SUCCESS :
            const questionID = parseInt(action.payload);
            console.log('questionID'+ questionID);
            return state.filter(item => item.id !== questionID);
        default : 
            return state;
    }
}