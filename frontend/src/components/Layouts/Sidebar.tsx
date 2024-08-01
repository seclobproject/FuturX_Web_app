import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState, useAppSelector } from '../../store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '../Icon/IconCaretsDown';
import IconCaretDown from '../Icon/IconCaretDown';
import IconMenuDashboard from '../Icon/Menu/IconMenuDashboard';
import IconMinus from '../Icon/IconMinus';
import IconMenuCharts from '../Icon/Menu/IconMenuCharts';
import IconMenuWidgets from '../Icon/Menu/IconMenuWidgets';
import IconUser from '../Icon/IconUser';
import IconUsers from '../Icon/IconUsers';
import IconCashBanknotes from '../Icon/IconCashBanknotes';
import IconCreditCard from '../Icon/IconCreditCard';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    const { userInfo } = useAppSelector((state: any) => state.authReducer);

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <div className="dark:block hidden">
                                <img className="w-16 md:w-18 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" />
                            </div>
                            <div className="visible dark:hidden">
                                <img className="w-16 md:w-18 ml-[5px] flex-none" src="/logo in white letter-01.png" alt="logo" />
                            </div>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <IconMenuDashboard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <IconCaretDown />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                    <li>
                                <NavLink to="/dashboard">{t('Home')}</NavLink>
                            </li>
                            {userInfo && !userInfo.isAdmin && userInfo.userStatus && (
  <li>
    <NavLink to="/signup">{t('Add New Member')}</NavLink>
  </li>
)}
                                    </ul>
                                </AnimateHeight>
                            </li>

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Portal')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="nav-item">
                                        <NavLink to="/users/user-account-settings" className="group">
                                            <div className="flex items-center">
                                                <IconUser fill className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Profile')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                </ul>
                            </li> */}

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Network')}</span>
                            </h2>
                            {userInfo?.isAdmin &&(

                            <li className="menu nav-item">
                                <NavLink to="/all-users" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Members')}</span>
                                    </div>
                                </NavLink>
                            </li>
                        )}

<li className="menu nav-item">
                                <NavLink to="/direct-sponsors" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Direct Team')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="menu nav-item">
                                <NavLink to="/genealogy" className="group">
                                    <div className="flex items-center">
                                        <IconMenuWidgets className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Genealogy')}</span>
                                    </div>
                                </NavLink>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Withdraw')}</span>
                            </h2>

                            {/* <li className="menu nav-item">
                                <NavLink to="/withdraw" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Withdraw')}</span>
                                    </div>
                                </NavLink>
                            </li> */}

<li>
  {userInfo?.isAdmin ? (
   <NavLink to="/allwithdraw-history" className="group">
   <div className="flex items-center">
     <IconMenuCharts className="group-hover:!text-primary shrink-0" />
     <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
       {t(' All Withdraw History')}
     </span>
   </div>
 </NavLink>
  ) : (
    <NavLink to="/withdraw-history" className="group">
    <div className="flex items-center">
     <IconMenuCharts className="group-hover:!text-primary shrink-0" />
     <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">
     {t('Withdrawal History')}
          </span>
   </div>
    </NavLink>
  )}
</li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Rewards')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/show-rewards" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Show Rewards')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Histories')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <NavLink to="/history" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('History')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            {(userInfo?.isLeader||userInfo?.isPromoter)&&(
                            <li className="menu nav-item">
                                <NavLink to="/leader-wallet-history" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Leader Wallet History')}</span>
                                    </div>
                                </NavLink>
                            </li>
                            )}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Support')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <NavLink to="/support" className="group">
                                    <div className="flex items-center">
                                        <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Support Details')}</span>
                                    </div>
                                </NavLink>
                            </li> */}
                            {userInfo && userInfo.isAdmin && (
                                <>
                                    <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                        <IconMinus className="w-4 h-5 flex-none hidden" />
                                        <span>{t('Admin')}</span>
                                    </h2>

                                    <li className="menu nav-item">
                                        <NavLink to="/all-members" className="group">
                                            <div className="flex items-center">
                                                <IconUsers className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Members')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    {/* <li className="menu nav-item">
                                        <NavLink to="/withdraw-requests" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Manage Withdraw Request')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}

                                    <li className="menu nav-item">
                                        <NavLink to="/rejoining-wallet" className="group">
                                            <div className="flex items-center">
                                                <IconCashBanknotes className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Rejoining Wallet')}</span>
                                            </div>
                                        </NavLink>
                                    </li>

                                    <li className="menu nav-item">
                                        <NavLink to="/autopool" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Auto Pool')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    {/* <li className="menu nav-item">
                                        <NavLink to="/manage-reward" className="group">
                                            <div className="flex items-center">
                                                <IconMenuCharts className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Manage Reward')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                </>
                            )}

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <IconMinus className="w-4 h-5 flex-none hidden" />
                                <span>{t('Digital Visiting Card')}</span>
                            </h2> */}

                            {/* <li className="menu nav-item">
                                <NavLink to="/" className="group">
                                    <div className="flex items-center">
                                        <IconCreditCard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Create Card')}</span>
                                    </div>
                                </NavLink>
                            </li> */}

                            {/* <li className="menu nav-item">
                                <NavLink to="/" className="group">
                                    <div className="flex items-center">
                                        <IconCreditCard className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('View Card')}</span>
                                    </div>
                                </NavLink>
                            </li> */}
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
