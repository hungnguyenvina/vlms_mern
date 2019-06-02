import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadUserSuccess = (data) => {
    return {
        type: actionTypes.LOAD_USERS_SUCCESS,
        payload: data
    }
}

export const loadUser = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/users')
            .then(res => {
                alert('loaded');
                console.log(res.data);
                dispatch(loadUserSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const deleteUserSuccess = (userID) => {
    return {
        type: actionTypes.DELETE_USER_SUCCESS,
        payload: userID
    }
}

export const deleteUser = (userID) => {
    return (dispatch) => {
        axios.delete('http://localhost:3004/api/user/'+userID)
            .then(res => {
                dispatch(deleteUserSuccess(userID));
            }).catch(error => {

            });
    }
}

export const updateAdminProfileSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_ADMIN_PROFILE_SUCCESS,
        payload : data
    }
}

export const updateAdminProfile = (profile) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/update_admin_profile',profile)
            .then(res => {
                console.log(res.data);
                dispatch(updateAdminProfileSuccess(res.data.data));
            }).catch(error => {

            });
    }
}

export const becomeAnInstructorSuccess = (data) => {
    return {
        type: actionTypes.BECOME_AN_INSTRUCTOR_SUCCESS,
        payload : data
    }
}

export const becomeAnInstructor = (id) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/user/become_instructor/'+id,null,{withCredentials: true})
            .then(res => {
                console.log('after calling api become instructor...');
                console.log(res.data);
                dispatch(becomeAnInstructorSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const updateUserProfileSuccess = (id,data) => {
    return {
        type: actionTypes.UPDATE_USER_PROFILE_SUCCESS,
        id,
        payload : data
    }
}

export const updateUserProfile = (id,profile) => {
    return (dispatch) => {
        axios.put('http://localhost:3004/api/update_user_profile/'+id,profile)
            .then(res => {
                console.log(res.data);
                dispatch(updateUserProfileSuccess(id,res.data.data));
            }).catch(error => {

            });
    }
}

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload : data
    }
}

export const login = (user) => {
    return (dispatch) => {
        const request = axios.post('http://localhost:3004/api/login/',user,{withCredentials: true})
            .then(res => {
                console.log('request after login:');
                console.log(res.data);
                dispatch(loginSuccess(res.data));
            })
            
            .catch(error => {

            });
            
    }
}

export const registerSuccess = (data) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        payload : data
    }
}

export const register = (user) => {
    return (dispatch) => {
        const request = axios.post('http://localhost:3004/api/register/',user,{withCredentials: true})
            .then(res => res.data)
            .catch(error => {

            });
            console.log('request after register:');
            console.log(request);
            dispatch(registerSuccess(request));
    }
}

export const logoutSuccess = (data) => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        payload : data
    }
}

export const logout = (abc) => {
    return (dispatch) => {
        const request = axios.get('http://localhost:3004/api/logout/',{withCredentials: true})
            .then(res => res.data)
            .catch(error => {

            });
            console.log('request after logout:');
            console.log(request);
            dispatch(logoutSuccess(request));
    }
}

export const loadAuthenticatedUserSuccess = (data) => {
    console.log('loadAuthenticatedUserSuccess...');
    console.log(data);
    return {
        type: actionTypes.LOAD_AUTHENTICATED_USER_SUCCESS,
        payload: data
    }
}

export const loadAuthenticatedUserFailure = (data) => {
    console.log('loadAuthenticatedUserFailure...');
    console.log(data);
    return {
        type: actionTypes.LOAD_AUTHENTICATED_USER_FAILURE,
        payload: data
    }
}

export const loadAuthenticatedUser = () => {
    return (dispatch) => {
        axios.get('http://localhost:3004/api/user/auth/',{withCredentials: true})
            .then(res => {
                alert('loaded1');
                console.log(res.data);
                dispatch(loadAuthenticatedUserSuccess(res.data));
            }).catch(error => {
                alert('error');
                dispatch(loadAuthenticatedUserFailure(error));
            });
    }
}