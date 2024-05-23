import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector,  } from '../../store';
import {  getLeaderWalletHistory } from '../../store/userSlice';
import { DataTable } from 'mantine-datatable';
import { setPageTitle } from '../../store/themeConfigSlice';

function LeaderHistory() {
    const dispatch = useAppDispatch();
    const { data: rowData, error } = useAppSelector((state: any) => state.getAllLeaderHistoryReducer);
    console.log(rowData,"reowdata");
    
    
    useEffect(() => {
        dispatch(getLeaderWalletHistory());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setPageTitle('Leader Wallet History'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData || []);
    const [recordsData, setRecordsData]= useState(initialRecords);

    console.log(recordsData,"recordsData");
    

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
            return (rowData || []).filter((item: any) => {
                return (
                    item.category.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, rowData]);
    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            const year = dt.getFullYear();
            const hours = dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours();
            const minutes = dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes();
            const seconds = dt.getSeconds() < 10 ? '0' + dt.getSeconds() : dt.getSeconds();
    
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        }
        return '';
    };
  return (
    <>
     <div className="space-y-6">
            {/* Skin: Striped  */}
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light"> Leader Wallet History</h5>
                    {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
                </div>
                <div className="datatables">
                    <DataTable
                        striped
                        className="whitespace-nowrap table-striped"
                        records={recordsData}
                        columns={[
                            {
                                accessor: 'createdAt',
                                title: 'Date and Time',
                                render: ({ createdAt }:any) => <div>{formatDate(createdAt)}</div>,
                            },
                            { accessor: 'category', title: 'Category' },
                            { accessor: 'basedOnWho', title: 'Sponsored Member' },
                            { accessor: 'amount', title: 'Amount' },
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
    </>
  )
}

export default LeaderHistory