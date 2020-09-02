import * as actionTypes from './actionTypes';
import axios from 'axios';

export const loadUserTransactionSuccess = (data) => {
    return {
        type: actionTypes.LOAD_USER_TRANSACTIONS_SUCCESS,
        payload: data
    }
}

export const loadUserTransactions = () => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/users/transactions')
            .then(res => {
                //console.log(res.data);
                dispatch(loadUserTransactionSuccess(res.data));
            }).catch(error => {

            });
    }
}

export const loadUserTransactionDetailSuccess = (transactionID,data) => {
    return {
        type: actionTypes.LOAD_USER_DETAIL_TRANSACTIONS_SUCCESS,
        id: transactionID,
        payload: data
    }
}

export const loadUserTransactionsDetail = (transactionID) => {
    return (dispatch) => {
        axios.get('http://localhost:8000/api/users/transactions/detail/'+transactionID)
            .then(res => {
                //console.log(res.data);
                dispatch(loadUserTransactionDetailSuccess(transactionID,res.data));
            }).catch(error => {

            });
    }
}