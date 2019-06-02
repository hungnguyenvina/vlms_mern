import * as actionType from '../action/actionTypes';

const initialState = {
    courses: [],
    single_course: {},
    user_courses:[],
    instructor_courses:[],
    curriculum:[],
    lession:{}
};

export const CourseReducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.CREATE_COURSE_SUCCESS :
        console.log('CREATE_COURSE_SUCCESS');
        console.log(action.payload);
           return {
                ...state,
                instructor_courses: action.payload
            }
        case actionType.LOAD_COURSE_CURRICULUM_SUCCESS :
            console.log('payload COURSES CURRICULUM:');
            console.log(action.payload);
            return {
                ...state,
                curriculum: action.payload
            }
        case actionType.LOAD_COURSES_SUCCESS :
            console.log('payload COURSES:'+ action.payload);
            return {
                ...state,
                courses: action.payload
            }
        case actionType.LOAD_SINGLE_COURSE_SUCCESS :
            console.log('payload single course:'+ action.payload);
            return {
                ...state,
                single_course: action.payload
            }
        case actionType.LOAD_LESSION_BY_LESSION_ID_SUCCESS :
            console.log('payload single lession info:'+ action.payload);
            return {
                ...state,
                lession: action.payload
            }
        case actionType.LOAD_USER_COURSES_SUCCESS :
            console.log('payload COURSES:'+ action.payload.data);
            return {
                ...state,
                user_courses: action.payload.data
            }
        case actionType.LOAD_INSTRUCTOR_COURSES_SUCCESS :
            console.log('payload COURSES:'+ action.payload);
            return {
                ...state,
                instructor_courses: action.payload
            }
        case actionType.UPDATE_COURSE_CURRICULUM_SUCCESS :
            console.log('payload course curriculum:'+ action.payload);
            return {
                ...state,
                curriculum: action.payload
            }
        default : 
            return state;
    }
}