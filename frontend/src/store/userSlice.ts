import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constants';

// Typescript codes to define type
// interface UserInfo {
//     email: string;
//     password: string;
// }

// interface AppState {
//     userInfo: UserInfo | null;
//     pending: boolean;
//     error: boolean;
// }
// Typescript codes to define type

// Redux action to add new user
export const addNewUser = createAsyncThunk('addNewUser', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/users`,
        {
            name: user.userName,
            email: user.email,
            password: user.password,
        },
        config
    );

    return response.data;
});

// export const clearData = createAsyncThunk('logout', async () => {
//     localStorage.removeItem('userInfo');
// });

export const getAddNewUser = createSlice({
    name: 'getAddNewUser',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewUser.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(addNewUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                // localStorage.removeItem('userInfo');
                // localStorage.setItem('userInfo', JSON.stringify(action.payload));
            })
            .addCase(addNewUser.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            });
    },
});

// Redux action to add new user with referral
export const addNewUserWithRefferal = createAsyncThunk('addNewUserWithRefferal', async (user: any) => {
    const config = {
        headers: {
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(
        `${URL}/api/users/add-user-by-refferal`,
        {
            name: user.userName,
            email: user.email,
            password: user.password,
            sponser: user.userId,
        },
        config
    );

    return response.data;
});

export const addNewUserWithRefferalSlice = createSlice({
    name: 'addNewUserWithRefferalSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addNewUserWithRefferal.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(addNewUserWithRefferal.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addNewUserWithRefferal.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            });
    },
});

// Redux action to edit user profile
export const editUserProfile = createAsyncThunk('editUserProfile', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.put(
        `${URL}/api/admin/edit-profile`,
        {
            name: user.userName,
            email: user.email,
            password: user.password,
        },
        config
    );

    return response.data;
});

export const editUserSlice = createSlice({
    name: 'editUserSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editUserProfile.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            });
    },
});

// Redux action to edit user profile
export const getAllUsers = createAsyncThunk('getAllSponsors', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-users`, config);

    return response.data;
});

export const getAllUsersSlice = createSlice({
    name: 'getAllUsersSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            });
    },
});

// Redux action to get all transactions
export const getAllTransactions = createAsyncThunk('getAllTransactions', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-all-transactions`, config);

    return response.data;
});

export const getAllTransactionsSlice = createSlice({
    name: 'getAllTransactionsSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTransactions.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            });
    },
});

// Redux action to get the user details
export const getUserDetails = createAsyncThunk('getUserDetails', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-user-details`, config);

    return response.data;
});

export const getUserDetailsSlice = createSlice({
    name: 'getUserDetailsSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Some internal server error occured!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'User not found!';
                }
            });
    },
});

// Redux action to get user by level
export const getUsersByLevel = createAsyncThunk('getUsersByLevel', async (level: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/users/get-users-by-level`, { level }, config);

    return response.data;
});

export const getUsersByLevelSlice = createSlice({
    name: 'getUsersByLevelSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersByLevel.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getUsersByLevel.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUsersByLevel.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Some internal server error occured!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'User not found!';
                }
            });
    },
});

// Redux action to joining request
export const sendJoiningRequest = createAsyncThunk('sendJoiningRequest', async (hash: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/users/join`, { hash }, config);

    console.log(response.data);

    return response.data;
});

export const sendJoiningRequestSlice = createSlice({
    name: 'sendJoiningRequestSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendJoiningRequest.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(sendJoiningRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(sendJoiningRequest.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
            });
    },
});

// Redux action to request withdrawal
export const requestWithdrawal = createAsyncThunk('requestWithdrawal', async (data: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const { amount, walletAddress } = data;

    const response = await axios.post(`${URL}/api/users/request-withdrawal`, { amount, walletAddress }, config);

    return response.data;
});

export const requestWithdrawalSlice = createSlice({
    name: 'requestWithdrawalSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestWithdrawal.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(requestWithdrawal.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(requestWithdrawal.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
            });
    },
});

// Redux action to add to savings
export const addToSavings = createAsyncThunk('addToSavings', async (data: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const { amount } = data;

    const response = await axios.post(`${URL}/api/users/manage-payment-to-savings`, { amount }, config);

    return response.data;
});

export const addToSavingsSlice = createSlice({
    name: 'addToSavingsSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToSavings.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(addToSavings.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addToSavings.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
            });
    },
});

// Redux action to upgrade/rejoining
export const upgradeUser = createAsyncThunk('upgradeUser', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/upgrade-level`, config);

    return response.data;
});

export const upgradeUserSlice = createSlice({
    name: 'upgradeUserSlice',
    initialState: {
        loading: false,
        data: null,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(upgradeUser.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(upgradeUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(upgradeUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.error('Error', action.payload);
            });
    },
});

// Redux action to get withdraw history
export const withdrawHistory = createAsyncThunk('withdrawHistory', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-withdrawal-history`, config);

    return response.data;
});

export const withdrawHistorySlice = createSlice({
    name: 'withdrawHistorySlice',
    initialState: {
        loading: false,
        data: null,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(withdrawHistory.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(withdrawHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(withdrawHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.error('Error', action.payload);
            });
    },
});

// Redux action to get reward
export const getReward = createAsyncThunk('getReward', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-reward`, config);

    return response.data;
});

export const getRewardSlice = createSlice({
    name: 'getRewardSlice',
    initialState: {
        loading: false,
        data: null,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReward.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getReward.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getReward.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.error('Error', action.payload);
            });
    },
});

// Get all users to user
export const getAllUsersToUser = createAsyncThunk('getAllUsers', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/users/get-all-users-under-you`, config);

    return response.data;
});

export const getAllUsersToUserSlice = createSlice({
    name: 'getAllUsersToUserSlice',
    initialState: {
        loading: false,
        data: null,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersToUser.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllUsersToUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsersToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                console.error('Error', action.payload);
            });
    },
});

export const getAllUsersToUserReducer = getAllUsersToUserSlice.reducer;
export const getRewardReducer = getRewardSlice.reducer;
export const getAllTransactionsReducer = getAllTransactionsSlice.reducer;
export const addToSavingsReducer = addToSavingsSlice.reducer;
export const withdrawHistoryReducer = withdrawHistorySlice.reducer;
export const upgradeUserReducer = upgradeUserSlice.reducer;
export const requestWithdrawalReducer = requestWithdrawalSlice.reducer;
export const sendJoiningRequestReducer = sendJoiningRequestSlice.reducer;
export const getUsersByLevelReducer = getUsersByLevelSlice.reducer;
export const addNewUserReducer = getAddNewUser.reducer;
export const addNewUserByReferralReducer = addNewUserWithRefferalSlice.reducer;
export const editUserReducer = editUserSlice.reducer;
export const getAllUsersReducer = getAllUsersSlice.reducer;
export const getUserDetailsReducer = getUserDetailsSlice.reducer;
