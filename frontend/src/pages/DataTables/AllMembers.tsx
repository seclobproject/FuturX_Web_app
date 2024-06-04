import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { deleteUserForAdmin, getAllUsersToAdmin, verifyUserForAdmin } from '../../store/adminSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const AllMembers = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('Pending');
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.getAllUsersToAdminReducer);
    const { loading: verifiedUserLoading, data: verifiedUserData, error: verifiedUserError } = useAppSelector((state: any) => state.verifyUserForAdminReducer);
    const { loading: deletedUserLoading, data: deletedUserData, error: deletedUserError } = useAppSelector((state: any) => state.deleteUserForAdminReducer);
    const MySwal = withReactContent(Swal);

    let transformedData: any;
    if (rowData) {
        transformedData = rowData.map((record: any) => ({
            ...record,
            userStatus: record.userStatus ? 'Active' : 'Inactive',
        }));
    }

    useEffect(() => {
        dispatch(getAllUsersToAdmin());
    }, [dispatch, verifiedUserData, deletedUserData]);

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

    useEffect(() => {
        setInitialRecords(() => {
            return (transformedData || []).filter((item: any) => {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.ownSponserId.toLowerCase().includes(search.toLowerCase()) ||
                    item.userStatus.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, rowData]);

    const editHandler = (id: any) => {
        navigate(`/users/edit-user-by-admin/${id}`);
    };
    

    const verifyHandler = (userId: any) => {
        const confirming = confirm('Are you sure?');
        if (confirming) {
            dispatch(verifyUserForAdmin(userId));
            showMessage2()

        }
    };

    const deleteHandler = (userId: any) => {
        const confirming = confirm('Are you sure?');
        if (confirming) {
            dispatch(deleteUserForAdmin(userId));
            showMessage3()
        }
    };

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };
    const showMessage2 = () => {
        MySwal.fire({
            title: `User Approved Successfully`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };
    const showMessage3 = () => {
        MySwal.fire({
            title: `User Deleted Successfully`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    

    
    return (
        <div className="space-y-6">
            {/* Skin: Striped  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Members</h5>
                    {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'name', title: 'Name' },
                            { accessor: 'sponser.name', title: 'Sponsor' },
                            { accessor: 'verifyStatus', title: 'Status' },
                            { accessor: 'transactionID', title: 'Transaction ID' },
                            {
                                accessor: 'createdAt',
                                title: 'Joining Date',
                                render: ({ createdAt }) => <div>{formatDate(createdAt)}</div>,
                            },
                            {
                                accessor: 'Actions',
                                title: 'Actions',
                                render: (user: any) => (
                                    <div className="flex space-x-2">
                                        <button type="button" onClick={() => editHandler(user._id)} className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white p-2 rounded-lg">
                                            Edit
                                        </button>
                                        {user.verifyStatus === 'pending' && (
                    <button
                        type="button"
                        onClick={() => deleteHandler(user._id)}
                        className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white p-2 rounded-lg"
                    >
                        Delete
                    </button>
                )}
                {user.verifyStatus === 'inactive' && (
                    <>
                        <button
                            type="button"
                            onClick={() => verifyHandler(user._id)}
                            className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white p-2 rounded-lg"
                        >
                            Verify
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteHandler(user._id)}
                            className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white p-2 rounded-lg"
                        >
                            Delete
                        </button>
                    </>
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

export default AllMembers;
