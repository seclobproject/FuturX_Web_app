import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IRootState, useAppDispatch, useAppSelector } from '../../store';
import { toggleRTL, toggleTheme, toggleSidebar } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import Dropdown from '../Dropdown';
import IconMenu from '../Icon/IconMenu';
import IconCalendar from '../Icon/IconCalendar';
import IconEdit from '../Icon/IconEdit';
import IconChatNotification from '../Icon/IconChatNotification';
import IconSearch from '../Icon/IconSearch';
import IconXCircle from '../Icon/IconXCircle';
import IconSun from '../Icon/IconSun';
import IconMoon from '../Icon/IconMoon';
import IconLaptop from '../Icon/IconLaptop';
import IconMailDot from '../Icon/IconMailDot';
import IconArrowLeft from '../Icon/IconArrowLeft';
import IconInfoCircle from '../Icon/IconInfoCircle';
import IconBellBing from '../Icon/IconBellBing';
import IconUser from '../Icon/IconUser';
import IconMail from '../Icon/IconMail';
import IconLockDots from '../Icon/IconLockDots';
import IconLogout from '../Icon/IconLogout';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuApps from '../Icon/Menu/IconMenuApps';
import IconMenuComponents from '../Icon/Menu/IconMenuComponents';
import IconMenuElements from '../Icon/Menu/IconMenuElements';
import IconMenuDatatables from '../Icon/Menu/IconMenuDatatables';
import IconMenuForms from '../Icon/Menu/IconMenuForms';
import IconMenuPages from '../Icon/Menu/IconMenuPages';
import IconMenuMore from '../Icon/Menu/IconMenuMore';
import { logout } from '../../store/authSlice';
import IconMenuInvoice from '../Icon/Menu/IconMenuInvoice';
import WalletConnectButton from '../Button';

const Header = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { userInfo } = useAppSelector((state: any) => state.authReducer);
console.log(userInfo,"yser from headr")
    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
        if (!userInfo) {
            navigate('/signin');
        }
    }, [location, userInfo]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const { t } = useTranslation();

    const logoutHandler = (e: any) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
            <div className="shadow-sm">
                <div className="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-black">
                    <div className="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                        <Link to="/" className="main-logo flex items-center shrink-0">
                            <div className="dark:block hidden">
                                <img className="w-16 md:w-18 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" />
                            </div>
                            <div className="visible dark:hidden">
                                <img className="w-16 md:w-18 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" />
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            onClick={() => {
                                dispatch(toggleSidebar());
                            }}
                        >
                            <IconMenu className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="ltr:mr-2 rtl:ml-2 hidden sm:block">
                        <ul className="flex items-center space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]"></ul>
                    </div>
                    <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                        <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                        <div>
                            {themeConfig.theme === 'light' ? (
                                <button
                                    className={`${
                                        themeConfig.theme === 'light' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('dark'));
                                    }}
                                >
                                    <IconSun />
                                </button>
                            ) : (
                                ''
                            )}
                            {themeConfig.theme === 'dark' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'dark' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('system'));
                                    }}
                                >
                                    <IconMoon />
                                </button>
                            )}
                            {themeConfig.theme === 'system' && (
                                <button
                                    className={`${
                                        themeConfig.theme === 'system' &&
                                        'flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60'
                                    }`}
                                    onClick={() => {
                                        dispatch(toggleTheme('light'));
                                    }}
                                >
                                    <IconLaptop />
                                </button>
                            )}
                        </div>
                        <div className="dropdown shrink-0 flex">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="relative group block"
                                button={<img className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-silhouette.png" alt="userProfile" />}
                            >
                                <ul className="text-dark dark:text-white-dark !py-0 w-[290px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="rounded-md w-15 h-10 object-cover" src="/assets/images/user-silhouette.png" alt="userProfile" />
                                            <div className="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 className="text-base">
                                                    {userInfo && userInfo.name}
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white">
                                                    {userInfo && userInfo.email}
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link to="/users/user-account-settings" className="dark:hover:text-white">
                                            <IconUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link to="" onClick={logoutHandler} className="text-danger !py-3">
                                            <IconLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>

                {/* horizontal menu */}
                <ul className="horizontal-menu hidden py-1.5 font-semibold px-6 lg:space-x-1.5 xl:space-x-8 rtl:space-x-reverse bg-white border-t border-[#ebedf2] dark:border-[#191e3a] dark:bg-black text-black dark:text-white-dark">
                   
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDashboard className="shrink-0" />
                                <span className="px-1">{t('Dashboard')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/dashboard">{t('Home')}</NavLink>
                            </li>
                            {userInfo && !userInfo.isAdmin && userInfo.userStatus &&(
  <li>
    <NavLink to="/signup">{t('Add New Member')}</NavLink>
  </li>
)}
     

                            {/* <li>
                                <NavLink to="/analytics">{t('analytics')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crypto">{t('crypto')}</NavLink>
                            </li> */}
                        </ul>
                    </li>
                    {userInfo && userInfo.isAdmin && (
                        <li className="menu nav-item relative">
                            <button type="button" className="nav-link">
                                <div className="flex items-center">
                                    <IconMenuComponents className="shrink-0" />
                                    <span className="px-1">{t('Admin')}</span>
                                </div>
                                <div className="right_arrow">
                                    <IconCaretDown />
                                </div>
                            </button>
                            <ul className="sub-menu">
                                <li>
                                    <NavLink to="/all-members">{t('All Members')}</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/withdraw-requests">{t('Manage Withdraw Requests')}</NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/rejoining-wallet">{t('Rejoining Wallet')}</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/autopool">{t('Auto Pool')}</NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to="/manage-reward">{t('Manage Reward')}</NavLink>
                                </li> */}
                            </ul>
                        </li>
                    )}
                    {/* <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuApps className="shrink-0" />
                                <span className="px-1">{t('Profile')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/users/user-account-settings">{t('Profile')}</NavLink>
                            </li>
                        </ul>
                    </li> */}
                   
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuDatatables className="shrink-0" />
                                <span className="px-1">{t('Network')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            {userInfo?.isAdmin &&(
   <li>
   <NavLink to="/all-users">{t('Members')}</NavLink>
</li>
                            )}
                         
                            <li>
                                <NavLink to="/direct-sponsors">{t('Direct Team')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/genealogy">{t('Genealogy')}</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuComponents className="shrink-0" />
                                <span className="px-1">{t('Withdraw')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            {/* <li>
                                <NavLink to="/withdraw">{t('Request Withdraw')}</NavLink>
                            </li> */}
                          <li>
  {userInfo?.isAdmin ? (
    <NavLink to="/allwithdraw-history">{t('All Withdrawal History')}</NavLink>
  ) : (
    <NavLink to="/withdraw-history">{t('Withdrawal History')}</NavLink>
  )}
</li>

                        </ul>
                    </li>
                    <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuElements className="shrink-0" />
                                <span className="px-1">{t('Rewards')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/show-rewards">{t('Show Rewards')}</NavLink>
                            </li>
                        </ul>
                    </li>
                    {/* <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuPages className="shrink-0" />
                                <span className="px-1">{t('Support')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/support">{t('Support Details')}</NavLink>
                            </li>
                        </ul>
                    </li> */}

                    {/* <li className="menu nav-item relative">
                        <button type="button" className="nav-link">
                            <div className="flex items-center">
                                <IconMenuForms className="shrink-0" />
                                <span className="px-1">{t('Card')}</span>
                            </div>
                            <div className="right_arrow">
                                <IconCaretDown />
                            </div>
                        </button>
                        <ul className="sub-menu">
                            <li>
                                <NavLink to="/">{t('Create Card')}</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">{t('View Card')}</NavLink>
                            </li>
                        </ul>
                    </li> */}
 <li className="menu nav-item relative">
                  
                        
                        {/* <ul className="sub-menu">
                            <li>
                                <NavLink to="/users/user-account-settings">{t('Add Fund')}</NavLink>
                            </li>
                            <li>
                            </li>
                        </ul> */}
                    </li>
                 
                          <button type="button" className="nav-link">
                            <NavLink to="/history">{t('History')}</NavLink>

                          
                
                        </button>
                        {(userInfo?.isLeader||userInfo?.isPromoter)&&(
         <button type="button" className="nav-link">
         <NavLink to="/leader-wallet-history">{t('Leader Wallet History')}</NavLink>

             {/* <span className="px-1">{t('Add Fund')}</span> */}
       
        
     </button>
                        )}
               
                </ul>
                
            </div>
        </header>
    );
};

export default Header;
