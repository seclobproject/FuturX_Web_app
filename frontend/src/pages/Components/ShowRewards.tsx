import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { useAppDispatch, useAppSelector } from '../../store';
import { getReward } from '../../store/userSlice';

// const getItems: any[] = [
//     {
//         id: '1',
//         src: '/assets/images/lightbox1.jpg',
//         title: 'Rewards',
//         description: 'Photo: Samuel Rohl',
//     },
// ];

const ShowRewards = () => {
    const dispatch = useAppDispatch();

    const { data: rewardData } = useAppSelector((state: any) => state.getRewardReducer);

    console.log(rewardData);

    useEffect(() => {
        dispatch(setPageTitle('Show Rewards'));
    });
    const [value, setValue] = useState<any>('all controls');
    const [isOpen, setIsOpen] = useState<any>(false);
    const [photoIndex, setPhotoIndex] = useState<any>(0);

    const handleChange = (e: any) => setValue(e.target.value);
    const [tabs] = useState<string>('All controls');
    const [tabs1] = useState<string>('All controls');
    useEffect(() => {
        window['global'] = window as never;
    }, []);

    useEffect(() => {
        dispatch(getReward());
    }, [dispatch]);

    return (
        <div>
            <div className="pt-5 space-y-8">
                {/* Lightbox */}
                <div className="panel">
                    <h5 className="font-semibold text-center text-lg dark:text-white-light mb-5">Rewards</h5>
                    <div className="mb-5">
                        <div className="flex mt-10 justify-center">
                            <>
                                {/* {getItems.map((item, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={item.id}
                                            className={`${index === 3 ? 'md:row-span-2 md:col-span-2' : ''}`}
                                            onClick={() => {
                                                setIsOpen(true);
                                                setPhotoIndex(index);
                                            }}
                                        >
                                            <img src={item.src} alt="gallery" data-fancybox="gallery" className="rounded-md w-full h-full object-cover" />
                                        </button>
                                    );
                                })} */}
                                {rewardData?.imageName && <img src={`https://login.futurx.vip/uploads/${rewardData?.imageName}`} alt="reward-img" />}
                            </>

                            {/* {isOpen && (
                                <Lightbox
                                    mainSrc={`${getItems[photoIndex]?.src}`}
                                    nextSrc={`${getItems[photoIndex + (1 % getItems.length)]?.src}`}
                                    prevSrc={`${setTimeout(() => {
                                        return getItems[(photoIndex + getItems.length - 1) % getItems.length]?.src;
                                    })}`}
                                    onCloseRequest={() => setIsOpen(false)}
                                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % getItems.length)}
                                    onMovePrevRequest={() => setPhotoIndex((photoIndex + getItems.length - 1) % getItems.length)}
                                    animationDuration={300}
                                    keyRepeatLimit={180}
                                />
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowRewards;
