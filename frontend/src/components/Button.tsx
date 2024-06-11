import { useWeb3Modal } from '@web3modal/ethers/react';
import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { URL } from '../Constants';

function truncate(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}

const WalletConnectButton = ({ size }: any) => {
    const { open } = useWeb3Modal();
    const { address } = useWeb3ModalAccount();
    const [userInfo, setUserInfo] = useState(null);

    const handleAddStoreAddress = async (address: string) => {
        try {
            console.log("work");

            const token: any = localStorage.getItem('userInfo');
            const parsedData = JSON.parse(token);
            setUserInfo(parsedData);

            if (!parsedData || !parsedData.access_token) {
                console.error('User info or access token not available');
                return;
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${parsedData.access_token}`,
                    'content-type': 'application/json',
                },
            };

            const response = await axios.post(`${URL}/api/admin/store-wallet-address`, { address }, config);
            console.log(response, 'responsesdsdsdsd');

            if (response.status === 200) {
                console.log('Successfully connected and sent Address!');
            } else {
                console.error('Failed to connect and send Address');
            }
        } catch (error) {
            console.error('Error verifying payment:', error);
        }
    };

    useEffect(() => {
        if (address) {
            handleAddStoreAddress(address);
        }
    }, [address]);

    useEffect(() => {
        const token: any = localStorage.getItem('userInfo');
        const parsedData = JSON.parse(token);
        setUserInfo(parsedData);
    }, []);

    return (
        <Fragment>
            <button
                type="button"
                className="rounded-lg p-2 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 text-white"
                onClick={() => open()}
            >
                {address ? truncate(address, 8) : 'Connect Wallet'}
            </button>
        </Fragment>
    );
};

export default WalletConnectButton;
