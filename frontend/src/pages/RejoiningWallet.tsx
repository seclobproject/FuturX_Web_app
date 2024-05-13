import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch, useAppSelector } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { getRejoiningWalletAmount } from '../store/adminSlice';

const RejoiningWallet = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Widgets'));
    });
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const { data } = useAppSelector((state: any) => state.getRejoiningWalletAmountReducer);

    const [loading] = useState(false);

    useEffect(() => {
        dispatch(getRejoiningWalletAmount());
    }, [dispatch]);

    return (
        <div>
            <div className="mt-6">
                <div className="grid lg:grid-cols-1 mb-6">
                    <div
                        className="panel bg-gradient-to-r from-purple-950 to-purple-800 h-full overflow-hidden before:bg-purple-950 before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                        // style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                    >
                        <div className="flex items-center justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Rejoining Balance</h5>
                            <div className="relative text-xl whitespace-nowrap">$ {data && data.rejoiningWallet}</div>
                        </div>
                        <h5 className="text-gray-100">Your total rejoining wallet amount will be shown here!</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RejoiningWallet;
