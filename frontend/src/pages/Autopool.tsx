import { Dialog, Transition } from '@headlessui/react';
import { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import IconUser from '../components/Icon/IconUser';
import { getAllUsersInAutoPool, getAutoPoolAmount, splitAutopoolAmount } from '../store/adminSlice';
// import { stat } from 'fs';

const Autopool = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Widgets'));
    });

    const [modal2, setModal2] = useState(false);

    const { data: autoPoolUsers } = useAppSelector((state: any) => state.getAllUsersInAutoPoolReducer);
    const { data: autoPoolSplit } = useAppSelector((state: any) => state.splitAutoPoolAmountReducer);
    const { data: autoPoolAmount } = useAppSelector((state: any) => state.getAutoPoolIncomeReducer);

    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [loading] = useState(false);

    useEffect(() => {
        dispatch(getAllUsersInAutoPool());
        dispatch(getAutoPoolAmount());
    }, [dispatch, autoPoolSplit]);

    const splitAmountHandler = (e: any) => {
        e.preventDefault();
        const result = confirm("Are you sure you want to split the auto pool?");
        if (result) {
            dispatch(splitAutopoolAmount());
        }
        setModal2(false);
    };

    return (
        <div>
            <div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-1 gap-6 mb-6">
                    <div className="panel h-full p-0 border-0 overflow-hidden">
                        <div className="p-6 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 min-h-[160px]">
                            <div className="text-white flex justify-center items-center">
                                <p className="text-xl">Auto Pool</p>
                            </div>
                        </div>

                        <div className="-mt-12 px-8 grid grid-cols-1 gap-2">
                            <div className="bg-white rounded-md shadow px-4 py-2.5 dark:bg-[#060818]">
                                <span className="flex justify-between items-center mb-4 dark:text-white">Total Balance</span>
                                <div className="btn w-full  py-1 text-base shadow-none border-0 bg-[#ebedf2] dark:bg-black text-[#515365] dark:text-[#bfc9d4]">${autoPoolAmount.autoPoolAmount}</div>
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center justify-center dark:text-white-light mb-5">
                                <h5 className="font-semibold text-lg">Split Auto Pool Amount</h5>
                            </div>

                            <div className="text-center px-2 flex justify-around">
                                <button
                                    onClick={splitAmountHandler}
                                    type="button"
                                    className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  py-2 px-3 rounded-lg text-white ltr:mr-2 rtl:ml-2"
                                >
                                    Split Amount
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="flex items-center justify-between dark:text-white-light mb-5">
                            <h5 className="font-semibold text-lg">Auto Pool Users</h5>
                        </div>
                        <div>
                            {autoPoolUsers &&
                                autoPoolUsers.map((user: any) => (
                                    <div className="space-y-6 mt-2">
                                        <div className="flex">
                                            <span className="shrink-0 grid place-content-center w-9 h-9 rounded-md bg-danger-light dark:bg-danger text-danger dark:text-danger-light">
                                                <IconUser className="w-6 h-6" />
                                            </span>
                                            <div className="px-3 flex flex-1 items-center">
                                                <div>{user.name}</div>
                                            </div>
                                            <span className="text-success text-base px-1 ltr:ml-auto rtl:mr-auto whitespace-pre flex items-center">
                                                {user && user.currentPlan == 'promoter'
                                                    ? `Promoter`
                                                    : user && user.currentPlan == 'royalAchiever'
                                                    ? 'Royal Achiever'
                                                    : user && user.currentPlan == 'crownAchiever'
                                                    ? 'Crown Achiever'
                                                    : user && user.currentPlan == 'diamondAchiever'
                                                    ? 'Diamond Achiever'
                                                    : 'Promoter'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Transition appear show={modal2} as={Fragment}>
                <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0" />
                    </Transition.Child>
                    <div className="fixed inset-0 bg-[black]/60 z-[999] overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel as="div" className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                                    <div className="p-5">
                                        <p>Are you sure to split auto pool amount to users?</p>
                                        <div className="flex justify-end items-center mt-8">
                                            <button type="button" className="btn btn-outline-danger" onClick={() => setModal2(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={splitAmountHandler}>
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition> */}
        </div>
    );
};

export default Autopool;
