import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AnimateHeight from 'react-animate-height';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { IRootState } from '../../store';
import IconArrowWaveLeftUp from '../../components/Icon/IconArrowWaveLeftUp';
import IconDesktop from '../../components/Icon/IconDesktop';
import IconUser from '../../components/Icon/IconUser';
import IconBox from '../../components/Icon/IconBox';
import IconDollarSignCircle from '../../components/Icon/IconDollarSignCircle';
import IconRouter from '../../components/Icon/IconRouter';
import IconPlusCircle from '../../components/Icon/IconPlusCircle';
import IconMinusCircle from '../../components/Icon/IconMinusCircle';

const Support = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Support'));
    });
    const [active, setActive] = useState<Number>();
    const togglePara = (value: Number) => {
        setActive((oldValue) => {
            return oldValue === value ? 0 : value;
        });
    };
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [activeTab, setActiveTab] = useState<String>('general');
    const [active1, setActive1] = useState<any>(1);
    const [active2, setActive2] = useState<any>(1);

    return (
        <div>
            <div className="panel text-center">
                <h3 className="mb-2 text-xl font-bold dark:text-white md:text-2xl">Need help?</h3>
                <div className="text-lg font-medium text-white-dark">
                    Our specialists are always happy to help. Email us 24/7 and we'll get back to you.
                </div>
                <div className='text-lg font-medium text-sky-400/100 mt-6'><a href='mailto:dreamzmeta@gmail.com'>dreamzmeta@gmail.com</a></div>
            </div>
        </div>
    );
};

export default Support;
