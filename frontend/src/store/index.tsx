import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from './themeConfigSlice';
import authReducer from './authSlice';

import {
    addNewUserReducer,
    addNewUserByReferralReducer,
    editUserReducer,
    getAllUsersReducer,
    getUserDetailsReducer,
    getUsersByLevelReducer,
    sendJoiningRequestReducer,
    requestWithdrawalReducer,
    upgradeUserReducer,
    withdrawHistoryReducer,
    addToSavingsReducer,
    getAllTransactionsReducer,
    getRewardReducer,
    getAllUsersToUserReducer
} from './userSlice';

import {
    getAllUsersToAdminReducer,
    getUserDetailsToAdminReducer,
    getAllUsersInAutoPoolReducer,
    splitAutoPoolAmountReducer,
    getAutoPoolIncomeReducer,
    getRejoiningWalletAmountReducer,
    verifyUserReducer,
    getWithdrawRequestsReducer,
    verifyUserForAdminReducer,
    managePaymentSendReducer,
    editUserByAdminReducer,
    uploadImageReducer,
    getTotalAmountsReducer,
    deleteUserForAdminReducer
} from './adminSlice';

import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    authReducer,
    addNewUserReducer,
    addNewUserByReferralReducer,
    editUserReducer,
    getAllUsersReducer,
    getUserDetailsReducer,
    getUsersByLevelReducer,
    getAllUsersToAdminReducer,
    getUserDetailsToAdminReducer,
    getAllUsersInAutoPoolReducer,
    splitAutoPoolAmountReducer,
    getAutoPoolIncomeReducer,
    getRejoiningWalletAmountReducer,
    sendJoiningRequestReducer,
    verifyUserReducer,
    requestWithdrawalReducer,
    getWithdrawRequestsReducer,
    managePaymentSendReducer,
    upgradeUserReducer,
    verifyUserForAdminReducer,
    editUserByAdminReducer,
    withdrawHistoryReducer,
    addToSavingsReducer,
    uploadImageReducer,
    getAllTransactionsReducer,
    getRewardReducer,
    getTotalAmountsReducer,
    getAllUsersToUserReducer,
    deleteUserForAdminReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export type IRootState = ReturnType<typeof rootReducer>;

export default store;
