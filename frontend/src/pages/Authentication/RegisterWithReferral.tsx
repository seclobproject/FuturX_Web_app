import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import IconUser from '../../components/Icon/IconUser';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { addNewUser, addNewUserWithRefferal } from '../../store/userSlice';
import { logout } from '../../store/authSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
// import Dropdown from '../../components/Dropdown';
// import i18next from 'i18next';
// import IconCaretDown from '../../components/Icon/IconCaretDown';
// import IconInstagram from '../../components/Icon/IconInstagram';
// import IconFacebookCircle from '../../components/Icon/IconFacebookCircle';
// import IconTwitter from '../../components/Icon/IconTwitter';
// import IconGoogle from '../../components/Icon/IconGoogle';

const RegisterWithReferral = () => {
    const { userId } = useParams();
    const [url, setUrl] = useState(window.location.href);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const { loading, data: userData, error } = useAppSelector((state: any) => state.addNewUserByReferralReducer);

    useEffect(() => {
        dispatch(setPageTitle('Register new member'));
    }, [userData]);

    const showAlert = async (type: number) => {
        if (type === 15) {
            const toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 3000,
            });
            toast.fire({
                icon: 'success',
                title: 'Copied successfully',
                padding: '10px 20px',
            });
        }
    };

    const handleShareClick = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Share',
                    text: 'Share your refferal link',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            console.warn('Web Share API not supported on this browser');
        }
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        const data = { userName, email, password, userId };
        if (password !== reEnterPassword) {
            alert('Passwords do not match');
            return;
        } else {
            dispatch(addNewUserWithRefferal(data));
        }
        // if (userData) navigate('/');
    };

    const logoutHandler = (e: any) => {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6"></div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="main-logo flex justify-center shrink-0 mb-10">
                                <div className="dark:block hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="/assets/images/logo.png" alt="logo" />
                                </div>
                                <div className="visible dark:hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="/assets/images/logo-dark.png" alt="logo" />
                                </div>
                            </div>
                            <label htmlFor="userName">Copy the refferal link from below</label>
                            <div className="flex items-center mb-5">
                                <input type="text" value={url} className="form-input" onChange={(e) => setUrl(e.target.value)} />
                                <div className="referralBtn sm:flex sm:space-y-0 sm:space-x-2 rtl:space-x-reverse">
                                    <div className="hidden md:block">
                                        <CopyToClipboard
                                            text={url}
                                            onCopy={(text, result) => {
                                                if (result) {
                                                    showAlert(15);
                                                }
                                            }}
                                        >
                                            <button type="button" className="btn btn-primary ms-2">
                                                Copy
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                    <div className="md:hidden">
                                        <CopyToClipboard text={url}>
                                            <button type="button" onClick={handleShareClick} className="btn btn-primary ms-2">
                                                Share
                                            </button>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-10 flex flex-col items-center">
                                <h1 className="text-xl font-extrabold uppercase !leading-snug text-primary md:text-2xl">Add new member</h1>
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
                            <div onClick={logoutHandler} className="text-center mt-7 dark:text-white cursor-pointer">
                                Logout
                            </div>
                            {/* <div className="relative my-7 text-center md:mb-9">
                                <span className="absolute inset-x-0 top-1/2 h-px w-full -translate-y-1/2 bg-white-light dark:bg-white-dark"></span>
                                <span className="relative bg-white px-2 font-bold uppercase text-white-dark dark:bg-dark dark:text-white-light">or</span>
                            </div>
                            <div className="mb-10 md:mb-[60px]">
                                <ul className="flex justify-center gap-3.5 text-white">
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconInstagram />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconFacebookCircle />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconTwitter fill={true} />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-full p-0 transition hover:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239, 18, 98, 1) 0%, rgba(67, 97, 238, 1) 100%)' }}
                                        >
                                            <IconGoogle />
                                        </Link>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterWithReferral;
