import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addCourseToCartSuccess = (data) => {
    return {
        type: actionTypes.ADD_COURSE_TO_CART_SUCCESS,
        payload : data
    }
}

export const addCourseToCart = (courseID) => {
    return (dispatch) => {
        axios.post('http://localhost:3004/api/cart/add/'+courseID,courseID,{withCredentials: true})
            .then(res => {
                console.log('after call api add course to cart');
                console.log(res.data);
                dispatch(addCourseToCartSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadMultipleCoursesSucccess = (data) => {
    return {
        type: actionTypes.LOAD_MULTIPLE_COURSES_SUCCESS,
        payload : data
    }
}

export const loadMultipleCourses = (courseIDArray,userCart) => {
    alert('courseIDArray='+typeof(courseIDArray) + "@"+courseIDArray.length);
    console.log(courseIDArray);
    
    var type = "single";
    if(courseIDArray.length > 1) {
        
        type="array";
        alert('type'+type);
    }
    return (dispatch) => {
        axios.get('http://localhost:3004/api/courses?id='+courseIDArray+"&type="+type)
            .then(res => {
                console.log('after call api get multiple courses');
                console.log(res.data);
                userCart.forEach(item=>{
                    res.data.forEach((k,i)=>{
                        if(item.id === k.id) {
                            res.data[i].quantity = item.quantity;
                        }
                    });
                })
                dispatch(loadMultipleCoursesSucccess(res.data));
            }).catch(error => {

            });
    }
}

export const removeCourseFromCartSuccess = (data) => {
    return {
        type: actionTypes.REMOVE_COURSE_FROM_CART_SUCCESS,
        payload : data
    }
}

export const removeCourseFromCart = (courseID) => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/cart/delete?id='+courseID,{withCredentials: true})
            .then(res => {
                console.log('after call api remove course from cart');
                console.log(res.data);
                res.data.cart.forEach(item=>{
                    res.data.cartDetail.forEach((k,i)=>{
                        if(item.id === k.id) {
                            res.data.cartDetail[i].quantity = item.quantity;
                        }
                    });
                })
                dispatch(removeCourseFromCartSuccess(res.data));
            }).catch(error => {

            });
    }
}