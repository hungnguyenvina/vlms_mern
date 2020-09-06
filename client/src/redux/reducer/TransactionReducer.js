import * as actionType from '../action/actionTypes';
const initialState = {
    transactions:[],
    user_transactions: [],
    user_transactions_detail: [],
    single_user_transaction: []
};

export const TransactionReducer = (state = initialState.user_transactions,action) => {
    switch(action.type) {
        case actionType.LOAD_USER_TRANSACTIONS_SUCCESS :
            return {
                ...state,
                user_transactions: action.payload.data
            }
        case actionType.LOAD_USER_DETAIL_TRANSACTIONS_SUCCESS :
            return {
                ...state,
                user_transactions_detail: action.payload.data
            }      
        case actionType.SAVE_USER_TRANSACTION_SUCCESS: 
            console.log('SAVE_USER_TRANSACTION_SUCCESS reducer');
            console.log(action.payload);
            return {
                ...state,
                transactions: action.payload
            };
        default : 
            return state;
    }
}