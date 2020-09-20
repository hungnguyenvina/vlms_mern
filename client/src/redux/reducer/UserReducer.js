import * as actionType from '../action/actionTypes';

const initialState = {
    question_categories: [],
    course_categories: [],
    users: [],
    user: {},
    loginSuccess:false,
    registerSuccess: false,
    becomeAnInstructorSuccess:false
};

export const UserReducer = (state = initialState,action) => {
    switch(action.type) {
        case actionType.LOGIN_SUCCESS:
            console.log('reducer login success...');
            console.log(action.payload);
            return {
                ...state,
                loginSuccess:true,
                user:action.payload.user
            }
        case actionType.BECOME_AN_INSTRUCTOR_SUCCESS:
                console.log('reducer become an instructor success...');
                console.log(action.payload);
                return {
                    ...state,
                    becomeAnInstructorSuccess:true,
                    user: {
                        ...state.user,
                        isAmdin: false,
                        role:1
                    }
                }
        case actionType.REGISTER_SUCCESS:
            console.log('reducer register success...');
            return {
                ...state,
                registerSuccess:true
            }
        case actionType.LOGOUT_SUCCESS:
            console.log('reducer logout success...');
            return {
                ...state,
                loginSuccess:false,
                user: {}
            }
        case actionType.LOAD_AUTHENTICATED_USER_FAILURE:
                console.log('payload');
                console.log(action.payload);
                return {
                    ...state,
                    user: null,
                    loginSuccess:false
                }    
        case actionType.LOAD_AUTHENTICATED_USER_SUCCESS:
            console.log('payload LOAD_AUTHENTICATED_USER_SUCCESS');
            console.log(action.payload);
            let newState2 = {
                ...state,
                user: action.payload
            }
            console.log('new state');
            console.log(newState2);
            return newState2;
        case actionType.LOAD_USERS_SUCCESS :
            console.log('payload'+ action.payload.data);
            const newState1 = [
                ...state,
                ...action.payload.data
                ];
            console.log('after state'+ newState1);
            //return newState1;
            return action.payload.data;
        case actionType.LOAD_SINGLE_USER_SUCCESS :
            console.log('LOAD_SINGLE_USER_SUCCESS ');
            console.log(action.payload);
            const newStateSingleUser = {
                ...state,
                user: action.payload.user
            };
            console.log('after LOAD_SINGLE_USER_SUCCESS'+ newStateSingleUser);
            //return newState1;
            return newStateSingleUser;
        case actionType.DELETE_USER_SUCCESS :
            const userID = parseInt(action.payload);
            console.log('userID'+ userID);
            return state.filter(item => item.id !== userID);
        case actionType.UPDATE_ADMIN_PROFILE_SUCCESS :
            console.log(action.payload);
            console.log(state);
            return {
                ...state,
                users: action.payload
            }
        case actionType.UPDATE_USER_PROFILE_SUCCESS :
            console.log('payload LOAD_AUTHENTICATED_USER_SUCCESS');
            console.log(action.payload);
            let newStateUpdateUserInfo = {
                ...state,
                user: action.payload.user
            }
            console.log('new state');
            console.log(newStateUpdateUserInfo);
            return newStateUpdateUserInfo;
        default : 
            return state;
    }
}