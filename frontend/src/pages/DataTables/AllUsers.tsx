import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { getAllUsersToAdmin, verifyUserForAdmin } from '../../store/adminSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllUsers, getAllUsersToUser } from '../../store/userSlice';

const AllUsers = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('Pending');
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.getAllUsersToUserReducer);
    const { loading: verifiedUserLoading, data: verifiedUserData, error: verifiedUserError } = useAppSelector((state: any) => state.verifyUserForAdminReducer);

    let transformedData: any;
    if (rowData) {
        transformedData = rowData.map((record: any) => ({
            ...record,
            userStatus: record.userStatus ? 'Active' : 'Inactive',
        }));
    }

    useEffect(() => {
        dispatch(getAllUsersToUser());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPageTitle('All Users'));
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
                    item.email.toLowerCase().includes(search.toLowerCase())
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
        }
    };

    return (
        <div className="space-y-6">
            {/* Skin: Striped  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Members</h5>
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            { accessor: 'name', title: 'Name' },
                            { accessor: 'userStatus', title: 'Status' },
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

export default AllUsers;
