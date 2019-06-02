import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadCourseSuccess = (data) => {
    return {
        type: actionTypes.LOAD_COURSES_SUCCESS,
        payload: data
    }
}

export const loadCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/all_courses')
            .then(res => {
                console.log('after call API....');
                console.log(res.data);
                dispatch(loadCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadSingleCourseSuccess = (data) => {
    return {
        type: actionTypes.LOAD_SINGLE_COURSE_SUCCESS,
        payload: data
    }
}

export const loadSingleCourse = (courseID) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/course/'+courseID)
            .then(res => {
                console.log('after call get single course API....');
                console.log(res.data[0]);
                dispatch(loadSingleCourseSuccess(res.data[0]));
            }).catch(error => {

            });
    }
}

export const loadUserCourseSuccess = (data) => {
    return {
        type: actionTypes.LOAD_USER_COURSES_SUCCESS,
        payload: data
    }
}

export const loadUserCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/user/courses')
            .then(res => {
                console.log(res.data);
                dispatch(loadUserCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadInstructorCourseSuccess = (data) => {
    return {
        type: actionTypes.LOAD_INSTRUCTOR_COURSES_SUCCESS,
        payload: data
    }
}

export const loadInstructorCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/instructor_courses')
            .then(res => {
                console.log(res.data);
                dispatch(loadInstructorCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const createCourseSuccess = (data) => {
    return {
        type: actionTypes.CREATE_COURSE_SUCCESS,
        payload : data
    }
}

export const createCourse = (course) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/course',course)
            .then(res => {
                console.log('after call api add course');
                console.log(res.data);
                dispatch(createCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const updateCourseCurriculumSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_COURSE_CURRICULUM_SUCCESS,
        payload : data
    }
}

export const updateCourseCurriculum = (id,course) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/course/update_curriculum/'+id,course)
            .then(res => {
                console.log(res.data);
                dispatch(updateCourseCurriculumSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadCourseCurriculum = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/course/curriculum/'+id)
            .then(res => {
                console.log(res.data);
                dispatch(loadCourseCurriculumSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadLessionByLessionIDSuccess = (data) => {
    return {
        type: actionTypes.LOAD_LESSION_BY_LESSION_ID_SUCCESS,
        payload: data
    }
}

export const loadLessionByLessionID = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/lession/'+id)
            .then(res => {
                console.log(res.data);
                dispatch(loadLessionByLessionIDSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadCourseCurriculumSuccess = (data) => {
    return {
        type: actionTypes.LOAD_COURSE_CURRICULUM_SUCCESS,
        payload: data
    }
}