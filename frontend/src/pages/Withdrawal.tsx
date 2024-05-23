import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { addToSavings, getUserDetails, requestWithdrawal } from '../store/userSlice';
import Swal from 'sweetalert2';
import TimerComponent from '../components/Timer';

const Withdrawal = () => {
    const dispatch = useAppDispatch();

    const [amount, setAmount] = useState();
    const [walletAddress, setWalletAddress] = useState('');
    const [message, setMessage] = useState(false);

    // const currentDateTime = new Date();
    // const [showButton, setShowButton] = useState(false);

    const { data: userInfo } = useAppSelector((state: any) => state.getUserDetailsReducer);
    const { data: withdrawInfo } = useAppSelector((state: any) => state.requestWithdrawalReducer);
    const { data: addToSavingsInfo } = useAppSelector((state: any) => state.addToSavingsReducer);

    useEffect(() => {
        dispatch(setPageTitle('Withdrawal'));
        dispatch(getUserDetails());

        if (withdrawInfo) {
            setMessage(true);
        }
    }, [dispatch, withdrawInfo, addToSavingsInfo]);

    setTimeout(() => {
        setMessage(false);
    }, 3000);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;


    const submitHandlerToWallet = async (type: number) => {
        if (type === 9) {
            Swal.fire({
                title: 'Are you sure want to withdraw to wallet?',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Proceed',
                cancelButtonText: 'Cancel',
                padding: '1em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (amount === undefined || amount === null || amount === '') {
                        Swal.fire({
                            title: 'Please enter amount',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText: 'Ok',
                            padding: '1em',
                            customClass: 'sweet-alerts',
                        });
                        return;
                    } else if (walletAddress === undefined || walletAddress === null || walletAddress === '') {
                        Swal.fire({
                            title: 'Please enter wallet address',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText: 'Ok',
                            padding: '1em',
                            customClass: 'sweet-alerts',
                        });
                        return;
                    } else if (amount > userInfo.earning) {
                        Swal.fire({
                            title: 'You do not have enough balance',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText: 'Ok',
                            padding: '1em',
                            customClass: 'sweet-alerts',
                        });
                        return;
                    }

                    dispatch(requestWithdrawal({ amount, walletAddress }));
                }
            });
        }
    };

    const submitHandlerToSavings = async (type: number) => {
        if (type === 10) {
            Swal.fire({
                title: 'Are you sure want to withdraw to savings?',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Proceed',
                cancelButtonText: 'Cancel',
                padding: '1em',
                customClass: 'sweet-alerts',
            }).then((result) => {
                if (result.isConfirmed) {
                    if (amount === undefined || amount === null || amount === '') {
                        Swal.fire({
                            title: 'Please enter amount',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText: 'Ok',
                            padding: '1em',
                            customClass: 'sweet-alerts',
                        });
                        return;
                    } else if (amount > userInfo.earning) {
                        Swal.fire({
                            title: 'You do not have enough balance',
                            showCloseButton: true,
                            showCancelButton: false,
                            focusConfirm: false,
                            confirmButtonText: 'Ok',
                            padding: '1em',
                            customClass: 'sweet-alerts',
                        });
                        return;
                    }
                    dispatch(addToSavings({ amount }));
                }
            });
        }
    };

    return (
        <div>
          
            <div className="flex flex-col items-center">
   
                <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white px-6 py-3 rounded-xl flex items-center mb-5">
                    <h2 className="text-lg font-semibold">Current wallet balance: {userInfo && userInfo.earning}</h2>
                </div>
                <form className="w-72 flex flex-col gap-3">
                    <input type="number" value={amount} onChange={(e: any) => setAmount(e.target.value)} placeholder="Enter the amount to withdraw" className="form-input" required />
                    <input type="text" value={walletAddress} onChange={(e: any) => setWalletAddress(e.target.value)} placeholder="Wallet Address" className="form-input" required />
                    <div className="text-center">{amount && `Withdrawable amount to wallet: ${amount - amount * 0.15}`}</div>
                    <div className="text-center">{amount && `Addable amount to savings: ${amount - amount * 0.05}`}</div>
                    {userInfo && userInfo.showWithdraw && (
                        <div className="flex flex-row items-center justify-center gap-3">
                            {userInfo && userInfo.showWithdraw == true && userInfo.userStatus == true && (
                                <>
                                    <button type="button" onClick={() => submitHandlerToWallet(9)} className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white p-2 rounded-lg">
                                        Withdraw to Wallet
                                    </button>
                                </>
                            )}
                            <button type="button" onClick={() => submitHandlerToSavings(10)} className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white p-2 rounded-lg">
                                Add to Savings
                            </button>
                        </div>
                    )}
                    {message && <div className="text-center">Submitted successfully!</div>}
                </form>
          
            </div>
        
        </div>
    );
};

export default Withdrawal;
