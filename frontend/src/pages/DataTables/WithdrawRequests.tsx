import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { getAllUsersToAdmin, getWithdrawRequests, managePaymentSend, verifyUser } from '../../store/adminSlice';
import { useNavigate } from 'react-router-dom';

const WithdrawRequests = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('Pending');
    const [amount, setAmount] = useState(0);
    const [walletAddress, setWalletAddress] = useState('');
    const [requestId, setRequestId] = useState('');

    // const { loading, data: rowData, error } = useAppSelector((state: any) => state.getAllUsersToAdminReducer);
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.getWithdrawRequestsReducer);
    const { loading: manageWithdrawLoading, data: manageWithdrawData, error: manageWithdrawError } = useAppSelector((state: any) => state.managePaymentSendReducer);

    let transformedData: any;
    if (rowData) {
        transformedData = rowData.map((record: any) => ({
            ...record,
            payStatus: record.status ? 'Paid' : 'Not Paid',
        }));
    }

    console.log(rowData);

    useEffect(() => {
        dispatch(getWithdrawRequests());
    }, [dispatch, manageWithdrawData]);

    useEffect(() => {
        dispatch(setPageTitle('All Members'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(transformedData || []);
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // useEffect(() => {
    //     setInitialRecords(() => {
    //         return (transformedData || []).filter((item: any) => {
    //             return (
    //                 item.user.name.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.walletAddress.toLowerCase().includes(search.toLowerCase()) ||
    //                 item.payStatus.toLowerCase().includes(search.toLowerCase())
    //             );
    //         });
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [search, rowData]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const payHandler = async (requestId: any) => {
        if (confirm('Are you sure you want to pay this user?')) {
            dispatch(managePaymentSend(requestId));
        }
    };

    return (
        <div className="space-y-6">
            {/* Skin: Striped  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Payment Request</h5>
                    {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'user.name', title: 'Name' },
                            { accessor: 'amount', title: 'Request Amount' },
                            { accessor: 'walletAddress', title: 'Wallet Address' },
                            { accessor: 'payStatus', title: 'Status' },
                            {
                                accessor: 'createdAt',
                                title: 'Request Date',
                                render: ({ createdAt }) => <div>{formatDate(createdAt)}</div>,
                            },
                            {
                                accessor: 'Actions',
                                title: 'Actions',
                                render: (requests: any) => (
                                    <div className="flex space-x-2">
                                        {requests.payStatus === 'Not Paid' && (
                                            <button type="button" onClick={() => payHandler(requests._id)} className="btn btn-success">
                                                {/* {isLoading ? 'Please Wait' ? isSuccess : 'Success' : 'Pay'} */}
                                                Pay
                                            </button>
                                        )}
                                    </div>
                                ),
                            },
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

export default WithdrawRequests;
