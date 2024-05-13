import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { getAllUsers, getUsersByLevel } from '../../store/userSlice';
import LevelTreeComponent from '../Components/LevelTreeComponent';
import IncomesComponent from '../Components/IncomesComponent';

const Reports = () => {
    const dispatch = useAppDispatch();

    const [activeTab, setActiveTab] = useState<any>(1);

    const { loading, data: rowData, error } = useAppSelector((state: any) => state.getAllUsersReducer);
    const { loading: level2Loading, data: level2Data, error: level2Error } = useAppSelector((state: any) => state.getUsersByLevelReducer);
    // const { loading:level3Loading, data:level3Data, error:level3Error } = useAppSelector((state: any) => state.getUsersByLevelReducer);

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch, level2Data]);

    useEffect(() => {
        dispatch(setPageTitle('Reports'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];

    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData || []);
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
            return (rowData || []).filter((item: any) => {
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

    // Level 2 Data
    const levelTwoHandler = () => {
        setActiveTab(2);
        // dispatch(getUsersByLevel(2));
    };
    const levelThreeHandler = () => {
        setActiveTab(3);
        // dispatch(getUsersByLevel(3));
    };
    const levelFourHandler = () => {
        setActiveTab(4);
        // dispatch(getUsersByLevel(4));
    };

    return (
        <div className="inline-block w-full">
            <ul className="mb-5 grid grid-cols-4 gap-2 text-center">
                <li>
                    <div
                        className={`${activeTab === 1 ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white' : ''}
                block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                        onClick={() => setActiveTab(1)}
                    >
                        Generation Income
                    </div>
                </li>

                <li>
                    <div
                        className={`${activeTab === 2 ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                        onClick={levelTwoHandler}
                    >
                        Sponsorship Income
                    </div>
                </li>

                <li>
                    <div
                        className={`${activeTab === 3 ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                        onClick={levelThreeHandler}
                    >
                        Autopool Income
                    </div>
                </li>

                <li>
                    <div
                        className={`${activeTab === 4 ? 'bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                        onClick={levelFourHandler}
                    >
                        Level 4
                    </div>
                </li>
            </ul>

            <div>
                <div className="mb-5">{activeTab === 1 && <IncomesComponent level={2} />}</div>
                <div className="mb-5">{activeTab === 2 && <IncomesComponent level={3} />}</div>
                <div className="mb-5">{activeTab === 3 && <IncomesComponent level={4} />}</div>
                <div className="mb-5">{activeTab === 4 && <IncomesComponent level={5} />}</div>
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    className={`bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  rounded-lg px-5 py-3 text-white ${activeTab === 1 ? 'hidden' : ''}`}
                    onClick={() => setActiveTab(activeTab === 4 ? 3 : activeTab === 3 ? 2 : activeTab === 2 ? 1 : 4)}
                >
                    Back
                </button>
                <button
                    type="button"
                    className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  rounded-lg px-5 py-3 text-white ltr:ml-auto rtl:mr-auto"
                    onClick={() => setActiveTab(activeTab === 1 ? 2 : activeTab === 2 ? 3 : activeTab === 3 ? 4 : 1)}
                >
                    {activeTab === 4 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};

export default Reports;
