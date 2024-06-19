import { DataTable } from 'mantine-datatable';
import { Fragment, useEffect, useState } from 'react';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import { addToSavings, getUserDetails, requestWithdrawal, withdrawHistory } from '../../store/userSlice';
import { Dialog, Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const WithdrawHistory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('Pending');
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.withdrawHistoryReducer);
    const [modal21, setModal21] = useState(false);
    const [amount, setAmount] = useState();
    const [walletAddress, setWalletAddress] = useState('');
    const [message, setMessage] = useState(false);

    let transformedData: any;

    console.log(rowData);
    

    if (rowData) {
        transformedData = rowData.map((record: any) => ({
            ...record,
            payStatus: record.status ? 'Payment Completed' : 'Payment Pending',
        }));
    }

    useEffect(() => {
        dispatch(withdrawHistory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPageTitle('Withdrawal History'));
    });

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(transformedData || []);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const { data: userInfo } = useAppSelector((state: any) => state.getUserDetailsReducer);
    const { data: withdrawInfo } = useAppSelector((state: any) => state.requestWithdrawalReducer);
    const { data: addToSavingsInfo } = useAppSelector((state: any) => state.addToSavingsReducer);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);


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
        <div className="space-y-6">
            
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Withraw History</h5>
                    {/* <button type="submit" onClick={() => setModal21(true)} className="btn btn-gradient !mt-6  border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]" > Request Withdraw</button> */}
                </div>
                <Transition appear show={modal21} as={Fragment}>
                            <Dialog
                                as="div"
                                open={modal21}
                                onClose={() => {
                                    setModal21(false);
                                }}
                            >
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0" />
                                </Transition.Child>
                                <div id="register_modal" className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                                    <div className="flex items-start justify-center min-h-screen px-4">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel className="panel border-0 py-1 px-4 rounded-lg overflow-hidden w-full max-w-sm my-8 text-black dark:text-white-dark">
                                                <div className="flex items-center justify-between p-5 font-semibold text-lg dark:text-white">
                                                    <h6>Add Withraw Request</h6>
                                                </div>
                                                <div className="p-5">
                                                <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white px-6 py-3 rounded-xl flex items-center mb-5">
                    <h2 className="text-lg font-semibold">Current wallet balance: {userInfo && userInfo.earning}</h2>
                </div>
                <form className="w-90 flex flex-col gap-3">
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
                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'amount', title: 'Amount' },
                            { accessor: 'payStatus', title: 'Status' },
                        ]}
                        totalRecords={initialRecords ? initialRecords.length : 0}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default WithdrawHistory;
