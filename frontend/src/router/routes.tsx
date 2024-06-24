import { lazy } from 'react';
import RegisterWithReferral from '../pages/Authentication/RegisterWithReferral';
import LevelTree from '../pages/DataTables/LevelTree';
import ShowRewards from '../pages/Components/ShowRewards';
import Support from '../pages/Pages/Support';
import AllMembers from '../pages/DataTables/AllMembers';
import WithdrawRequests from '../pages/DataTables/WithdrawRequests';
import EditUserByAdmin from '../pages/Users/EditUserByAdmin';
import Autopool from '../pages/Autopool';
import RejoiningWallet from '../pages/RejoiningWallet';
import Withdrawal from '../pages/Withdrawal';
import ManageReward from '../pages/Forms/ManageReward';
import WithdrawHistory from '../pages/DataTables/WithdrawHistory';
import Reports from '../pages/DataTables/Reports';
import History from '../pages/DataTables/History';
import AllUsers from '../pages/DataTables/AllUsers';
import LeaderHistory from '../pages/DataTables/LeaderHistory';
import AllWithrawHistory from '../pages/DataTables/AllWithrawHistory';
const Index = lazy(() => import('../pages/Index'));
const Finance = lazy(() => import('../pages/Finance'));
const Cards = lazy(() => import('../pages/Components/Cards'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const Skin = lazy(() => import('../pages/DataTables/Skin'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const Error = lazy(() => import('../components/Error'));

const routes = [
    {
        path: '/',
        element: <LoginBoxed />,
    },
    // dashboard
    {
        path: '/dashboard',
        element: <Finance />,
    },
    {
        path: '/withdraw-history',
        element: <WithdrawHistory />,
    },
    {
        path: '/allwithdraw-history',
        element: <AllWithrawHistory />,
    },

    // Autopool
    {
        path: '/autopool',
        element: <Autopool />,
    },
    {
        path: '/history',
        element: <History />,
    },
    {
        path: '/leader-wallet-history',
        element: <LeaderHistory />,
    },
    {
        path: '/direct-sponsors',
        element: <Skin />,
    },
    {
        path: '/all-users',
        element: <AllUsers />,
    },
    {
        path: '/all-members',
        element: <AllMembers />,
    },
    {
        path: '/genealogy',
        element: <LevelTree />,
    },
    {
        path: '/reports',
        element: <Reports />,
    },
    {
        path: '/show-rewards',
        element: <ShowRewards />,
    },
    {
        path: '/support',
        element: <Support />,
    },
    {
        path: '/rejoining-wallet',
        element: <RejoiningWallet />,
    },
    {
        path: '/withdraw',
        element: <Withdrawal />,
    },
    {
        path: '/withdraw-requests',
        element: <WithdrawRequests />,
    },
    // crypto page

    {
        path: '/components/cards',
        element: <Cards />,
    },
    
    {
        path: '/components/notifications',
        element: <Notification />,
    },
    

    // Data Tables

    {
        path: '/manage-reward',
        element: <ManageReward />,
    },

    // Users page
    {
        path: '/users/profile',
        element: <Profile />,
    },
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    {
        path: '/users/edit-user-by-admin/:id',
        element: <EditUserByAdmin />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    //Edited
    {
        path: '/signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    //Edited
    {
        path: '/signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/signup/:userId',
        element: <RegisterWithReferral />,
        layout: 'blank',
    },

    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
  
   
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
