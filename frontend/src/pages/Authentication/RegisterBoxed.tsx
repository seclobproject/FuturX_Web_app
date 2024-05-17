import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconPhoneCall from '../../components/Icon/IconPhoneCall';
import { addNewUser } from '../../store/userSlice';
import { logout } from '../../store/authSlice';

const RegisterBoxed = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [reEnterPassword, setReEnterPassword] = useState('');

    const { loading, data: userData, error } = useAppSelector((state: any) => state.addNewUserReducer);
    const { userInfo } = useAppSelector((state: any) => state.authReducer);

    // const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Register new member'));
    }, [userInfo]);

    // Reset user data and error state after successful submission
    useEffect(() => {
        if (userData) {
            setUserName('');
            setEmail('');
            setPassword('');
            setReEnterPassword('');
        }
    }, [userData]);

    // Redirect to signin page if user is not logged in
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
        }
    }, [userInfo]);

    const submitForm = (e: any) => {
        e.preventDefault();
        const data = { userName, email, password };
        if (password !== reEnterPassword) {
            alert('Passwords do not match');
            return;
        } else {
            dispatch(addNewUser(data));
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                {/* <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" /> */}
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6"></div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="main-logo flex justify-center shrink-0 mb-10">
                                <div className="dark:block hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" style={{ width: '100px' }} />
                                </div>
                                <div className="visible dark:hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" style={{ width: '100px' }} />
                                </div>
                            </div>
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-violet-950 md:text-4xl">Add new member</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter member details here to register</p>
                            </div>
                            <form className="space-y-5 dark:text-white" action="#">
                                <div>
                                    <label htmlFor="userName">User Name</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="userName"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                            type="text"
                                            placeholder="Enter User Name"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            required
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconUser fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            required
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconMail fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="Password">Password</label>
                                        <div onClick={() => setShowPass(!showPass)} className="hover:underline hover:cursor-pointer">
                                            Show Password
                                        </div>
                                    </div>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPass ? `text` : `password`}
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            required
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Password">Re-enter Password</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Password"
                                            value={reEnterPassword}
                                            type={showPass ? `text` : `password`}
                                            onChange={(e) => setReEnterPassword(e.target.value)}
                                            placeholder="Re-enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                            required
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    {loading && <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>}
                                    Sign Up
                                </button>
                            </form>
                            <div className="text-center mt-7 dark:text-white">
                                {userData && <div>Submitted successfully!</div>}
                                {error && <div className="text-red-600">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterBoxed;
