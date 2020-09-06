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
        axios.get('http://localhost:3004/api/courses/all_courses')
            .then(res => {
                //console.log('after call API....');
                //console.log(res.data);
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
        axios.get('http://localhost:3004/api/courses/'+courseID)
            .then(res => {
                console.log('after call get single course API....');
                console.log(res.data);
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
                //console.log(res.data);
                dispatch(loadUserCourseSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadUserEnrolledCoursesSuccess = (data) => {
    return {
        type: actionTypes.LOAD_USER_COURSES_SUCCESS,
        payload: data
    }
}

export const loadUserEnrolledCourses = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/user_courses',{withCredentials: true})
            .then(res => {
                console.log('loadUserEnrolledCourses action');
                console.log(res.data);
                dispatch(loadUserEnrolledCoursesSuccess(res.data));
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
        axios.get('http://localhost:3004/api/courses/instructor_courses',{withCredentials: true})
            .then(res => {
                //console.log(res.data);
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
        axios.post('http://localhost:3004/api/courses',course,{withCredentials: true})
            .then(res => {
                //console.log('after call api add course');
                //console.log(res.data);
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
        axios.put('http://localhost:3004/api/courses/update_curriculum/'+id,course)
            .then(res => {
                console.log('updateCourseCurriculum actions');
                console.log(res.data);
                dispatch(updateCourseCurriculumSuccess(res.data.curriculum));
            }).catch(error => {

            });
    }
}

export const updateCourseInfoSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_COURSE_INFO_SUCCESS,
        payload : data
    }
}

export const updateCourseInfo = (id,course) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/courses/update_course_info/'+id,course,{withCredentials: true})
            .then(res => {
                console.log('updateCourseInfo actions');
                console.log(res.data);
                dispatch(updateCourseInfoSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadCourseCurriculum = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses/curriculum/'+id)
            .then(res => {
                console.log('loadCourseCurriculum action...');
                console.log(res.data);
                dispatch(loadCourseCurriculumSuccess(res.data.curriculum));
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
        axios.get('http://localhost:3004/api/courses/lession/'+id)
            .then(res => {
                //console.log(res.data);
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


export const submitCourseForApproval = (id,courseStatus) => {
    return (dispatch) => {
        
        axios.put('http://localhost:3004/api/courses/submit_course_for_approval/'+id,courseStatus,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate course category');
                //console.log(res.data);
                //console.log(id);
                dispatch(loadInstructorCourseSuccess(res.data));
            }).catch(error => {

        });
    }
}

export const approveRejectCourse = (id,courseStatus) => {
    return (dispatch) => {
        
        axios.put('http://localhost:3004/api/courses/approve_reject_course/'+id,courseStatus,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate course category');
                //console.log(res.data);
                //console.log(id);
                dispatch(loadCourseSuccess(res.data));
            }).catch(error => {

        });
    }
}

export const deleteCourseSuccess = (courseID) => {
    return {
        type: actionTypes.DELETE_COURSE_SUCCESS,
        payload: courseID
    }
}

export const deleteCourse = (courseID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/courses/'+courseID)
            .then(res => {
                dispatch(deleteCourseSuccess(courseID));
            }).catch(error => {

            });
    }
}