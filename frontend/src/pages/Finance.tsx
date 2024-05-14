import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconPencilPaper from '../components/Icon/IconPencilPaper';
import { getUserDetails, upgradeUser } from '../store/userSlice';

import { useContractWrite, useBalance } from 'wagmi';
import { abi } from '../abi';
import WalletConnectButton from '../components/Button';
import { useAccount } from 'wagmi';
import { UsdtAddr } from '../Constants';
import TimerComponent from '../components/Timer';
import { getTotalAmounts, verifyUser } from '../store/adminSlice';

const Finance = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [rejoinMessage, setRejoinMessage] = useState(0);

    const currentDateTime = new Date();
    // const currentHour = currentDateTime.getHours();
    // const currentMinute = currentDateTime.getMinutes();
    // const currentTime = currentDateTime.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' });
    // const [showButton, setShowButton] = useState(false);

    const { data: userInfo } = useAppSelector((state: any) => state.getUserDetailsReducer);

    const { loading: joiningLoading, data: joiningData, error: joiningError } = useAppSelector((state: any) => state.sendJoiningRequestReducer);

    const { data: upgradeInfo, error: upgradeError } = useAppSelector((state: any) => state.upgradeUserReducer);

    const { data: totalAmountInfo } = useAppSelector((state: any) => state.getTotalAmountsReducer);

    console.log(totalAmountInfo);

    useEffect(() => {
        if (upgradeInfo) {
            setRejoinMessage(1);
            window.location.reload();
        } else if (upgradeError) {
            setRejoinMessage(2);
        }
    }, [upgradeInfo, upgradeError]);

    const { address } = useAccount();

    const result = useBalance({
        address,
        token: UsdtAddr,
    });

    const { data, isLoading, isSuccess, write, isError } = useContractWrite({
        address: UsdtAddr,
        abi,
        functionName: 'transferFrom',
        args: [address, '0x5421f8d1956ECe9B028486Fe40f1A342BB5fC17E', 1000000],
    });

    console.log(data); // This will show the data of hash of the transaction

    const { data: approvalData, write: approvalWrite } = useContractWrite({
        address: UsdtAddr,
        abi,
        functionName: 'approve',
        args: [address, 1000000],
        onError: (e: any) => {
            console.log(e);
        },
        onSuccess: (tx: any) => {
            setTimeout(() => {
                write();
            }, 5000);

            // lodash: delay instead of timeout
        },
    });

    // const [url, setUrl] = useState(`https://dreamzmeta.com/signup/${userInfo._id}`);
    let url = '';
    // if (userInfo) {
    //     url = `https://dreamzmeta.com/signup/${userInfo._id}`;
    // }

    useEffect(() => {
        dispatch(setPageTitle('Dashboard'));
        dispatch(getUserDetails());
        dispatch(getTotalAmounts());
    }, [dispatch]);

    //bitcoinoption
    // const bitcoin: any = {
    //     series: [
    //         {
    //             data: [21, 9, 36, 12, 44, 25, 59, 41, 25, 66],
    //         },
    //     ],
    //     options: {
    //         chart: {
    //             height: 45,
    //             type: 'line',
    //             sparkline: {
    //                 enabled: true,
    //             },
    //         },
    //         stroke: {
    //             width: 2,
    //         },
    //         markers: {
    //             size: 0,
    //         },
    //         colors: ['#00ab55'],
    //         grid: {
    //             padding: {
    //                 top: 0,
    //                 bottom: 0,
    //                 left: 0,
    //             },
    //         },
    //         tooltip: {
    //             x: {
    //                 show: false,
    //             },
    //             y: {
    //                 title: {
    //                     formatter: () => {
    //                         return '';
    //                     },
    //                 },
    //             },
    //         },
    //         responsive: [
    //             {
    //                 breakPoint: 576,
    //                 options: {
    //                     chart: {
    //                         height: 95,
    //                     },
    //                     grid: {
    //                         padding: {
    //                             top: 45,
    //                             bottom: 0,
    //                             left: 0,
    //                         },
    //                     },
    //                 },
    //             },
    //         ],
    //     },
    // };

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    useEffect(() => {
        if (data) {
            dispatch(verifyUser());
        }
    }, [data]);

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         const currentHour = currentDateTime.getHours();
    //         const currentMinute = currentDateTime.getMinutes();
    //         setShowButton(currentHour === 17 || (currentHour > 17 && currentHour < 21));
    //     }, 1000);

    //     return () => clearInterval(intervalId);
    // }, []);

    const upgradeHandler = () => {
        const confirmed = window.confirm('Are you sure you want to upgrade your plan?');
        if (confirmed) {
            dispatch(upgradeUser());
        }
    };

    useEffect(() => {
        dispatch(upgradeUser());
    }, [dispatch]);

    return (
        <div>
            <div className="pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Total income generated */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Amount</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.overallIncome.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Wallet amount and withdrawal */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Wallet Amount</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.earning.toFixed(2)}</div>
                            </div>
                            {userInfo && userInfo.showWithdraw == true && userInfo.userStatus == true && (
                                <>
                                    <button type="button" onClick={() => navigate('/withdraw')} className="btn rounded-lg p-2 mt-4 text-white">
                                        Withdraw
                                    </button>
                                    <div className="mt-3">Amount will be credited to your account within 24 hours</div>
                                </>
                            )}
                            {/* {!showButton && (
                                <div className="mt-2">
                                    <TimerComponent />
                                </div>
                            )} */}
                        </div>

                        {/*  Time On-Site */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Rejoining Wallet Amount</div>
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.joiningAmount.toFixed(2)}</div>
                                <button type="button" onClick={upgradeHandler} className="btn rounded-lg p-2 mt-4 text-white">
                                    Rejoin
                                </button>
                            </div>
                            {rejoinMessage == 1 && <>You are successfully upgraded.</>}
                            {rejoinMessage == 2 && <>You are not eligible for upgrade as of now</>}
                        </div>

                        {/* Generation income (Level income) */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Generation Income</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.generationIncome.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Sponsorship income (Direct refferal income) */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Sponsorship Income</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.sponsorshipIncome.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Global autopool income */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Global Autopool Income</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.autoPoolAmount.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Savings account */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Savings Account</div>
                            </div>
                            <div className="flex flex-col justify-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${userInfo && userInfo.savingsIncome.toFixed(2)}</div>
                            </div>
                        </div>

                        {/* Total direct refferals */}
                        <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                            <div className="flex justify-between">
                                <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Direct Refferals</div>
                            </div>
                            <div className="flex items-center mt-5">
                                <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> {userInfo && userInfo.children.length} </div>
                                {/* <div className="badge bg-white/30">- 2.35% </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Profile</h5>
                            <Link to="/users/user-account-settings" className="ltr:ml-auto rtl:mr-auto p-2 rounded-full bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <IconPencilPaper />
                            </Link>
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-col justify-center items-center">
                                {/* <img src="/assets/images/user-silhouette.png" alt="img" className="w-16 h-16 rounded-full object-cover  mb-5" /> */}
                                <p className="font-semibold text-primary text-xl">{userInfo && userInfo.name}</p>
                            </div>
                            <ul className="mt-5 flex flex-col items-center max-w-[170px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">User ID: {userInfo && userInfo.ownSponserId}</li>
                                <li className="flex items-center gap-2">
                                    Rank:{' '}
                                    {userInfo && userInfo.currentPlan == 'promoter'
                                        ? `Promoter`
                                        : userInfo && userInfo.currentPlan == 'royalAchiever'
                                        ? 'Royal Achiever'
                                        : userInfo && userInfo.currentPlan == 'crownAchiever'
                                        ? 'Crown Achiever'
                                        : userInfo && userInfo.currentPlan == 'diamondAchiever'
                                        ? 'Diamond Achiever'
                                        : 'Promoter'}
                                </li>
                                <li>
                                    Account Status:{' '}
                                    {userInfo && userInfo.userStatus === true ? <span className="text-green-600 text-sm">Activated</span> : <span className="text-red-700">Pending</span>}
                                </li>
                                <li>Auto Pool: {userInfo && userInfo.autoPool == false ? <span className="text-red-700">Not Activated</span> : <span className="text-green-600">Activated</span>}</li>
                                <WalletConnectButton />
                                {address && userInfo && userInfo.userStatus == false && (
                                    <button type="button" onClick={async () => await approvalWrite()} className="btn btn-outline-success">
                                        Activate account
                                    </button>
                                )}
                            </ul>
                            <div className="text-center mt-5">
                                {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == false && <>You are successfully sent your join request. You will be verified soon.</>}
                                {userInfo && userInfo.joiningRequest && userInfo.joiningRequest.status == true && <>You are verified.</>}
                            </div>
                            {/* Copy refferal link */}
                            <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                <div className="flex justify-between">
                                    <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Refferal Link</div>
                                </div>
                                <div className="flex items-center my-5">
                                    <input type="text" defaultValue={url} className="form-input" />
                                    <div className="referralBtn sm:flex sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                                        <CopyToClipboard
                                            text={url}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    alert('Refferal link copied successfully!');
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn rounded-lg p-2 ms-2 text-white">
                                                Copy
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            {userInfo && userInfo.isAdmin && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                        <div className="flex justify-between">
                                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Earning</div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-5">
                                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${totalAmountInfo && totalAmountInfo.earningSum}</div>
                                        </div>
                                    </div>
                                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                        <div className="flex justify-between">
                                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Autopool</div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-5">
                                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${totalAmountInfo && totalAmountInfo.totalAutoPoolBank}</div>
                                        </div>
                                    </div>
                                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                        <div className="flex justify-between">
                                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Rewards</div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-5">
                                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${totalAmountInfo && totalAmountInfo.rewards}</div>
                                        </div>
                                    </div>
                                    <div className="panel bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 ">
                                        <div className="flex justify-between">
                                            <div className="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Savings</div>
                                        </div>
                                        <div className="flex flex-col justify-center mt-5">
                                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3">${totalAmountInfo && totalAmountInfo.totalSaving}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 py-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <p className="mb-2 text-white-dark text-lg mt-5">Download Plan PDF from below</p>
                                <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                    <button type="button" className="rounded-lg py-2 px-5 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white">
                                        Download Now
                                    </button>
                                </p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/pdf-icon.png" alt="profile" className="w-16 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 py-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <h5 className="text-[#3b3f5c] text-[22px] md:text-[48px] font-semibold mb-2 dark:text-white-light">Trade Now!!!</h5>
                                <p className="mb-2 text-white-dark text-lg mt-5">Trading account will open shortly</p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/trade.png" alt="profile" className="w-60 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="mb-5 flex items-center">
                    <div className="w-full shadow-[4px_6px_10px_-3px_#bfc9d4] rounded border border-white-light dark:border-[#1b2e4b] panel p-0 dark:shadow-none">
                        <div className="px-5 pt-5 flex justify-evenly items-center flex-col sm:flex-row">
                            <div className="ltr:sm:pl-5 rtl:sm:pr-5 text-center sm:text-left">
                                <h5 className="text-[#3b3f5c] text-[22px] md:text-[48px] font-semibold mb-2 dark:text-white-light">Digital Business Card</h5>
                                <p className="mb-2 text-white-dark text-lg mt-5">Design your digital visiting card today</p>
                                <p className="font-semibold text-white-dark mt-4 sm:mt-8">
                                    <button type="button" className="rounded-lg py-2 px-5 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white">
                                        Create Your Card Today
                                    </button>
                                </p>
                            </div>

                            <div className="overflow-hidden">
                                <img src="/assets/images/digital-card.png" alt="profile" className="w-60 mt-5 object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Finance;
