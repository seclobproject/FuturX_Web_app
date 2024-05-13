import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../Constants';

// Redux action to get all users profile
export const getAllUsersToAdmin = createAsyncThunk('getAllUsers', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-users`, config);

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
            .addCase(getAllUsersToAdmin.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllUsersToAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsersToAdmin.rejected, (state, action) => {
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

// Typescript codes to define type
interface UserInfo {
    name: string;
    email: string;
}

interface AppState {
    data: UserInfo | null;
    loading: boolean;
    error: string;
}

const initialStateOfUserDetails: AppState = {
    data: null,
    loading: false,
    error: '',
};
// Typescript codes to define type

// GET Single user details to admin by ID
export const getUserDetailsToAdmin = createAsyncThunk('getUserDetailsToAdmin', async (id: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/admin/get-user-to-admin`, { id }, config);

    return response.data;
});

export const getUserDetailsToAdminSlice = createSlice({
    name: 'getUserDetailsToAdminSlice',
    initialState: initialStateOfUserDetails,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailsToAdmin.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getUserDetailsToAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getUserDetailsToAdmin.rejected, (state, action) => {
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

// Get all users in autopool

// Typescript codes to define type
interface UserInfo {
    name: string;
    email: string;
    currentPlan: string;
}

interface AppState {
    data: UserInfo | null;
    loading: boolean;
    error: string;
}

const initialStateOfAutopoolUsers: AppState = {
    data: null,
    loading: false,
    error: '',
};
// Typescript codes to define type

export const getAllUsersInAutoPool = createAsyncThunk('getAllUsersInAutoPool', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-autopool-users`, config);

    return response.data;
});

const getAllUsersInAutoPoolSlice = createSlice({
    name: 'getAllUsersInAutoPoolSlice',
    initialState: initialStateOfAutopoolUsers,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersInAutoPool.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAllUsersInAutoPool.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAllUsersInAutoPool.rejected, (state, action) => {
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

// Split autopool amount to everyone
export const splitAutopoolAmount = createAsyncThunk('splitAutopoolAmount', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/split-autopool-income`, config);

    console.log(response.data);

    return response.data;
});

const splitAutoPoolAmountSlice = createSlice({
    name: 'splitAutoPoolAmountSlice',
    initialState: {
        loading: false,
        data: '',
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(splitAutopoolAmount.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(splitAutopoolAmount.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(splitAutopoolAmount.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = true;
            });
    },
});

// Get the autopool amount
export const getAutoPoolAmount = createAsyncThunk('getAutoPoolAmount', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-autopool-income`, config);

    return response.data;
});

const getAutoPoolIncomeSlice = createSlice({
    name: 'getAutoPoolIncomeSlice',
    initialState: {
        loading: false,
        data: '',
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAutoPoolAmount.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getAutoPoolAmount.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAutoPoolAmount.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = true;
            });
    },
});

// Typescript codes to define type
interface UserInfo {
    rejoiningWallet: string;
}

interface AppState {
    data: UserInfo | null;
    loading: boolean;
    error: string;
}

const initialStateOfRejoiningWallet: AppState = {
    data: null,
    loading: false,
    error: '',
};
// Typescript codes to define type

// Get rejoining wallet amount present
export const getRejoiningWalletAmount = createAsyncThunk('getRejoiningWalletAmount', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-rejoining-wallet`, config);

    return response.data;
});

const getRejoiningWalletAmountSlice = createSlice({
    name: 'getRejoiningWalletAmountSlice',
    initialState: initialStateOfRejoiningWallet,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRejoiningWalletAmount.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getRejoiningWalletAmount.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getRejoiningWalletAmount.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Verify user
export const verifyUser = createAsyncThunk('verifyUser', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/verify-user-payment`, config);

    return response.data;
});

const verifyUserSlice = createSlice({
    name: 'verifyUserSlice',
    initialState: {
        loading: false,
        data: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyUser.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(verifyUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(verifyUser.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Verify user by admin
export const verifyUserForAdmin = createAsyncThunk('verifyUserForAdmin', async (userId: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/admin/verify-user-payment-by-admin`, { userId }, config);

    return response.data;
});

const verifyUserForAdminSlice = createSlice({
    name: 'verifyUserForAdminSlice',
    initialState: {
        loading: false,
        data: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyUserForAdmin.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(verifyUserForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(verifyUserForAdmin.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Delete user by admin
export const deleteUserForAdmin = createAsyncThunk('deleteUserForAdmin', async (userId: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/admin/delete-user-by-admin`, { userId }, config);

    return response.data;
});

const deleteUserForAdminSlice = createSlice({
    name: 'deleteUserForAdminSlice',
    initialState: {
        loading: false,
        data: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserForAdmin.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(deleteUserForAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(deleteUserForAdmin.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Get withdraw requests
export const getWithdrawRequests = createAsyncThunk('getWithdrawRequests', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-withdrawal-requests`, config);

    return response.data;
});

const getWithdrawRequestsSlice = createSlice({
    name: 'getWithdrawRequestsSlice',
    initialState: {
        loading: false,
        data: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getWithdrawRequests.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getWithdrawRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getWithdrawRequests.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Manage withdrawal request (Send payment)
export const managePaymentSend = createAsyncThunk('managePaymentSend', async (requestId: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.post(`${URL}/api/admin/manage-payment-send`, { requestId }, config);

    return response.data;
});

const managePaymentSendSlice = createSlice({
    name: 'managePaymentSendSlice',
    initialState: {
        loading: false,
        data: '',
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(managePaymentSend.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(managePaymentSend.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(managePaymentSend.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);
                state.error = 'Something went wrong, please try again later';
            });
    },
});

// Redux action to edit user profile
export const editUserProfileByAdmin = createAsyncThunk('editUserProfileByAdmin', async (user: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'application/json',
        },
    };

    const response = await axios.put(
        `${URL}/api/admin/edit-profile-by-admin`,
        {
            id: user.id,
            name: user.userName,
            email: user.email,
            password: user.password,
            earning: user.earning,
            joiningAmount: user.joiningAmount,
            lastWallet: user.lastWallet,
            totalWallet: user.totalWallet,
            generationIncome: user.generationIncome,
            sponsorshipIncome: user.sponsorshipIncome,
            overallIncome: user.overallIncome,
            autoPool: user.autoPool,
            autoPoolAmount: user.autoPoolAmount,
            currentPlan: user.currentPlan,
        },
        config
    );

    return response.data;
});

export const editUserByAdminSlice = createSlice({
    name: 'editUserByAdminSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(editUserProfileByAdmin.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(editUserProfileByAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(editUserProfileByAdmin.rejected, (state, action) => {
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

// Redux action to upload image
export const uploadImage = createAsyncThunk('uploadImage', async (file: any) => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    console.log('file', file.file);

    const formData = new FormData();
    formData.append('image', file.file);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
            'content-type': 'multipart/form-data',
        },
    };

    const response = await axios.post(`${URL}/api/admin/upload-reward`, formData, config);

    return response.data;
});

export const clearUploadData = createAsyncThunk('clearUploadData', async () => {
    console.log('clearing data');
});

export const uploadImageSlice = createSlice({
    name: 'uploadImageSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.loading = false;
                console.error('Error', action.payload);

                if (action.error.message === 'Request failed with status code 500') {
                    state.error = 'Please make sure you filled all the above details!';
                } else if (action.error.message === 'Request failed with status code 400') {
                    state.error = 'Email or Phone already used!';
                }
            })
            .addCase(clearUploadData.fulfilled, (state) => {
                state.data = null;
            });
    },
});

export const getTotalAmounts = createAsyncThunk('getTotalAmounts', async () => {
    const token: any = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(token);

    const config = {
        headers: {
            Authorization: `Bearer ${parsedData.access_token}`,
        },
    };

    const response = await axios.get(`${URL}/api/admin/get-total-amount`, config);

    return response.data;
});

export const getTotalAmountSlice = createSlice({
    name: 'getTotalAmountSlice',
    initialState: {
        loading: false,
        data: null,
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTotalAmounts.pending, (state: any) => {
                state.loading = true;
            })
            .addCase(getTotalAmounts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getTotalAmounts.rejected, (state, action) => {
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

export const deleteUserForAdminReducer = deleteUserForAdminSlice.reducer;
export const getTotalAmountsReducer = getTotalAmountSlice.reducer;
export const uploadImageReducer = uploadImageSlice.reducer;
export const editUserByAdminReducer = editUserByAdminSlice.reducer;
export const verifyUserForAdminReducer = verifyUserForAdminSlice.reducer;
export const managePaymentSendReducer = managePaymentSendSlice.reducer;
export const getWithdrawRequestsReducer = getWithdrawRequestsSlice.reducer;
export const verifyUserReducer = verifyUserSlice.reducer;
export const getRejoiningWalletAmountReducer = getRejoiningWalletAmountSlice.reducer;
export const getAutoPoolIncomeReducer = getAutoPoolIncomeSlice.reducer;
export const splitAutoPoolAmountReducer = splitAutoPoolAmountSlice.reducer;
export const getAllUsersInAutoPoolReducer = getAllUsersInAutoPoolSlice.reducer;
export const getUserDetailsToAdminReducer = getUserDetailsToAdminSlice.reducer;
export const getAllUsersToAdminReducer = getAllUsersSlice.reducer;
