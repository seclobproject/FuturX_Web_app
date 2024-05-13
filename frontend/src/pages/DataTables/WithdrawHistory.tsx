import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useNavigate } from 'react-router-dom';
import { withdrawHistory } from '../../store/userSlice';

const WithdrawHistory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [userStatus, setUserStatus] = useState('Pending');
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.withdrawHistoryReducer);

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

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    return (
        <div className="space-y-6">
            
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
