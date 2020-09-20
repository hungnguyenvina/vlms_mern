import * as actionType from '../action/actionTypes';

const initialState = {
    question_categories: [],
    course_categories: [],
    success: true   
};

export const CourseCategoryReducer = (state = initialState.course_categories,action) => {
    switch(action.type) {
        case actionType.LOAD_COURSE_CATEGORIES_SUCCESS :
            //console.log('payload'+ action.payload);
            const newState1 = [
                ...state,
                ...action.payload
                ];
            //console.log('after state'+ newState1);
            //return newState1;
            return action.payload;
        case actionType.CREATE_COURSE_CATEGORY_SUCCESS :
            //console.log(action.payload);
            return [
                ...state,
                action.payload
            ]
        case actionType.UPDATE_COURSE_CATEGORY_SUCCESS :
            const courseCategoryIDUpdate = action.id;
            //console.log('courseCategoryIDUpdate'+ courseCategoryIDUpdate);
            //console.log(action.payload);
            //console.log(state);
            const newState = state.filter(item => item._id !== courseCategoryIDUpdate);
            console.log(newState);
            return [
                ...newState,
                action.payload
            ]
        case actionType.DELETE_COURSE_CATEGORY_SUCCESS :
            const courseCategoryID = action.payload;
            //console.log('courseCategoryID'+ courseCategoryID);
            return state.filter(item => item._id !== courseCategoryID);
        default : 
            return state;
    }
}