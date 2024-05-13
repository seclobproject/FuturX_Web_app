import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUsersByLevel } from '../../store/userSlice';
import { log } from 'console';

interface LevelTreeComponentProps {
    level: any;
}

const IncomesComponent: React.FC<LevelTreeComponentProps> = ({ level }) => {
    const dispatch = useAppDispatch();

    const { loading: level2Loading, data: level2Data, error: level2Error } = useAppSelector((state: any) => state.getUsersByLevelReducer);

    const PAGE_SIZES = [10, 20, 30, 50, 100];

    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(level2Data || []);
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState('');

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        // Update the initialRecords2 when level2Data changes
        setInitialRecords2(level2Data || []);
    }, [level2Data]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        dispatch(getUsersByLevel(level));
    }, [dispatch]);

    return (
        <div className="space-y-6">
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Members</h5>
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search2} onChange={(e) => setSearch2(e.target.value)} />
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData2}
                        columns={[
                            { accessor: 'name', title: 'Name' },
                            { accessor: 'email', title: 'Email' },
                            { accessor: 'ownSponserId', title: 'Sponsor ID' },
                            { accessor: 'userStatus', title: 'Status', render: (value) => (value ? 'Active' : 'Inactive') },
                            { accessor: 'currentPlan', title: 'Current Rank' },
                        ]}
                        totalRecords={initialRecords2 ? initialRecords2.length : 0}
                        recordsPerPage={pageSize2}
                        page={page2}
                        onPageChange={(p) => setPage2(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize2}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default IncomesComponent;
