import * as actionType from '../action/actionTypes';

const initialState = {
    question_categories: [],
    course_categories: [],
    users: [],
    questions: [],
    question_categories_options_html: "",
    course_categories_options_html: ""
};

export const ShareReducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.LOAD_QUESTION_CATEGORIES_OPTIONS_HTML_SUCCESS :
            //alert('inside reducer'+ action.payload.content);
            console.log(action.payload.content);
            const newState = {
                ...state,
                question_categories_options_html: action.payload.content
            }
            console.log(newState);
            return action.payload.content;
        case actionType.LOAD_COURSE_CATEGORIES_OPTIONS_HTML_SUCCESS :
            //alert('inside reducer'+ action.payload.content);
            console.log(action.payload.content);
            const newState1 = {
                ...state,
                course_categories_options_html: action.payload.content
            }
            console.log(newState1);
            return action.payload.content;
        default : 
            return state;
    }
}