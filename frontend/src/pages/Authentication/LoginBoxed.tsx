import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { fetchUser } from '../../store/authSlice';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

interface ComponentProps {
    data?: any;
}

const LoginBoxed: React.FC<ComponentProps> = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const { pending, userInfo, error } = useAppSelector((state: any) => state.authReducer);

    console.log(userInfo,"user");
    
    useEffect(() => {
        // dispatch(setPageTitle('Login'));
        if (userInfo) navigate(`/dashboard`);
    }, [userInfo, navigate]);

    const showMessage2 = () => {
        MySwal.fire({
            title: `Login Successfull`,
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 5000,
            showCloseButton: true,
        });
    };
    const submitForm = (e: any) => {
        e.preventDefault();
        dispatch(fetchUser({ email, password }));
        if(userInfo){
            showMessage2()
                }
    };

    return (
        <div>
            <div className="absolute inset-0">
                {/* <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" /> */}
            </div>

            <div className="relative flex min-h-screen items-center  justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                {/* <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" /> */}
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[600px] py-6">
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="main-logo flex justify-center shrink-0 mb-10">
                                <div className="dark:block hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="/assets/images/logo in white letter-01.png" alt="logo" style={{ width: '100px' }} />
                                </div>
                                <div className="visible dark:hidden">
                                    <img className="w-36 md:w-48 ml-[5px] flex-none" src="logo in white letter-01.png" alt="logo" style={{ width: '100px' }} />
                                </div>
                            </div>
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-violet-950 md:text-4xl">Sign in</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white" action="#">
                                <div>
                                    <label htmlFor="Email">Email</label>
                                    <div className="relative text-white-dark">
                                        <input
                                            id="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter Email"
                                            className="form-input ps-10 placeholder:text-white-dark"
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
                                            type={showPass ? `text` : `password`}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter Password"
                                            className="form-input ps-10 placeholder:text-white-dark"
                                        />
                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                            <IconLockDots fill={true} />
                                        </span>
                                    </div>
                                </div>
                                <button onClick={submitForm} type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                    Sign in
                                </button>
                                <div className="text-center">{userInfo ? 'Success' : error ? 'Please check the credentials' : ''}</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
