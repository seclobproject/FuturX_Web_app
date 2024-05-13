import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconHome from '../../components/Icon/IconHome';
import { useAppDispatch, useAppSelector } from '../../store';
import { editUserProfile } from '../../store/userSlice';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useParams } from 'react-router-dom';
import { editUserProfileByAdmin, getUserDetailsToAdmin } from '../../store/adminSlice';

const EditUserByAdmin = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const MySwal = withReactContent(Swal);

    const { data: userInfo } = useAppSelector((state: any) => state.getUserDetailsToAdminReducer);

    const [userName, setUserName] = useState(userInfo?.name || '');
    const [email, setEmail] = useState(userInfo?.email || '');
    const [earning, setEarning] = useState(userInfo?.earning);
    const [joiningAmount, setJoiningAmount] = useState(userInfo?.joiningAmount);
    const [lastWallet, setLastWallet] = useState(userInfo?.lastWallet || 'earning');
    const [totalWallet, setTotalWallet] = useState(userInfo?.totalWallet);
    const [generationIncome, setGenerationIncome] = useState(userInfo?.generationIncome);
    const [sponsorshipIncome, setSponsorshipIncome] = useState(userInfo?.sponsorshipIncome);
    const [overallIncome, setOverallIncome] = useState(userInfo?.overallIncome);
    const [autoPool, setAutoPool] = useState(userInfo?.autoPool || false);
    const [autoPoolAmount, setAutoPoolAmount] = useState(userInfo?.autoPoolAmount);
    const [password, setPassword] = useState('');
    const [currentPlan, setCurrentPlan] = useState(userInfo?.currentPlan);

    useEffect(() => {
        dispatch(setPageTitle('Account Setting'));
    }, []);

    // Update state when userInfo changes
    useEffect(() => {
        setUserName(userInfo?.name || '');
        setEmail(userInfo?.email || '');
        setEarning(userInfo?.earning);
        setJoiningAmount(userInfo?.joiningAmount);
        setLastWallet(userInfo?.lastWallet || 'earning');
        setTotalWallet(userInfo?.totalWallet);
        setGenerationIncome(userInfo?.generationIncome);
        setSponsorshipIncome(userInfo?.sponsorshipIncome);
        setOverallIncome(userInfo?.overallIncome);
        setAutoPool(userInfo?.autoPool || false);
        setAutoPoolAmount(userInfo?.autoPoolAmount);
        setCurrentPlan(userInfo?.currentPlan);
        setPassword('');
    }, [userInfo]);

    const [tabs, setTabs] = useState<string>('home');
    const toggleTabs = (name: string) => {
        setTabs(name);
    };

    const showMessage2 = () => {
        MySwal.fire({
            title: `Updated successfully.<br /> Please logout and login again to reflect the changes.`,
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };

    useEffect(() => {
        dispatch(getUserDetailsToAdmin(id));
    }, [dispatch, id]);

    const profileEditHandler = (e: any) => {
        e.preventDefault();
        dispatch(
            editUserProfileByAdmin({ id, userName, email, password, earning, joiningAmount, lastWallet, totalWallet, generationIncome, sponsorshipIncome, overallIncome, autoPool, autoPoolAmount, currentPlan })
        );
        showMessage2();
    };

    // useEffect(() => {
    //     return () => {
    //         dispatch(resetStateAction());
    //     };
    // }, [dispatch]);

    return (
        <div>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <button
                                onClick={() => toggleTabs('home')}
                                className={`flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${tabs === 'home' ? '!border-primary text-primary' : ''}`}
                            >
                                <IconHome />
                                Profile settings
                            </button>
                        </li>
                    </ul>
                </div>
                {tabs === 'home' ? (
                    <div>
                        <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                            <h6 className="text-lg font-bold mb-5">General Information</h6>
                            <div className="flex flex-col sm:flex-row">
                                <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                    <img src="/assets//images/user-silhouette.png" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label htmlFor="name">Full Name</label>
                                        <input id="name" type="text" value={userName} onChange={(e: any) => setUserName(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input id="email" type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="text" placeholder="Enter New Password" value={password} onChange={(e: any) => setPassword(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Earning (Wallet amount)</label>
                                        <input id="email" type="number" value={earning} onChange={(e: any) => setEarning(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Rejoining Wallet (Rejoining amount)</label>
                                        <input id="email" type="number" value={joiningAmount} onChange={(e: any) => setJoiningAmount(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Select current wallet</label>
                                        <select id="currentWallet" value={lastWallet} onChange={(e: any) => setLastWallet(e.target.value)} className="form-input">
                                            <option value="earning">Earning</option>
                                            <option value="joining">Rejoining</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="totalWallet">Total Wallet (Total wallet amount till now)</label>
                                        <input id="totalWallet" type="number" value={totalWallet} onChange={(e: any) => setTotalWallet(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="generationIncome">Generation Income</label>
                                        <input id="generationIncome" type="number" value={generationIncome} onChange={(e: any) => setGenerationIncome(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="sponsorshipIncome">Sponsorship Income</label>
                                        <input id="sponsorshipIncome" type="number" value={sponsorshipIncome} onChange={(e: any) => setSponsorshipIncome(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="overallIncome">Overall Income</label>
                                        <input id="overallIncome" type="number" value={overallIncome} onChange={(e: any) => setOverallIncome(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="autoPool">Auto Pool</label>
                                        <div className="flex items-center cursor-pointer">
                                            <input id="autoPool" type="checkbox" checked={autoPool} onChange={() => setAutoPool(!autoPool)} className="form-checkbox" />
                                            <span className="text-white-dark">Activate</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="autoPoolAmount">Auto Pool Amount</label>
                                        <input id="autoPoolAmount" type="number" value={autoPoolAmount} onChange={(e: any) => setAutoPoolAmount(e.target.value)} className="form-input" />
                                    </div>
                                    <div>
                                        <label htmlFor="currentPlan">Select Rank</label>
                                        <select id="currentPlan" value={currentPlan} onChange={(e: any) => setCurrentPlan(e.target.value)} className="form-input">
                                            <option value="promoter">Promoter</option>
                                            <option value="royalAchiever">Royal Achiever</option>
                                            <option value="crownAchiever">Crown Achiever</option>
                                            <option value="diamondAchiever">Diamond Achiever</option>
                                        </select>
                                    </div>
                                    <div className="mt-6">
                                        <button onClick={profileEditHandler} type="button" className="btn btn-primary">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default EditUserByAdmin;
