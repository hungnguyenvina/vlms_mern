import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadCourseCategorySuccess = (data) => {
    //console.log('in action2: ',data);
    return {
        type: actionTypes.LOAD_COURSE_CATEGORIES_SUCCESS,
        payload: data
    }
}



export const loadCourseCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/course_categories',{withCredentials: true})
            .then(res => {
                //console.log('in action:',res.data);

                    dispatch(loadCourseCategorySuccess(res.data));
                
             
                
            }).catch(error => {

            });
    }
}

export const deleteCourseCategorySuccess = (courseCategoryID) => {
    return {
        type: actionTypes.DELETE_COURSE_CATEGORY_SUCCESS,
        payload: courseCategoryID
    }
}

export const deleteCourseCategory = (courseCategoryID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/course_categories/'+courseCategoryID,{withCredentials: true})
            .then(res => {
                dispatch(deleteCourseCategorySuccess(courseCategoryID));
            }).catch(error => {

            });
    }
}

export const createCourseCategorySuccess = (data) => {
    return {
        type: actionTypes.CREATE_COURSE_CATEGORY_SUCCESS,
        payload : data
    }
}

export const createCourseCategory = (courseCategory) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/course_categories/',courseCategory,{withCredentials: true})
            .then(res => {
                //console.log('result from api');
                //console.log(res.data);
                dispatch(createCourseCategorySuccess(res.data));
            }).catch(error => {

            });
    }
}

export const updateCourseCategorySuccess = (id,data) => {
    return {
        type: actionTypes.UPDATE_COURSE_CATEGORY_SUCCESS,
        id,
        payload : data
    }
}

export const updateCourseCategory = (id,courseCategory) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/course_categories/'+id,courseCategory,{withCredentials: true})
            .then(res => {
                //console.log('after call api updsate course category');
                //console.log(res.data);
                //console.log(id);
                dispatch(updateCourseCategorySuccess(id,res.data.courseCategory));
            }).catch(error => {

        });
    }
}