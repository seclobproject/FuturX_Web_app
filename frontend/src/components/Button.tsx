// import { truncate } from '@/utils/helper'
// import { Button, Text } from '@nextui-org/react'
import { useWeb3Modal } from '@web3modal/wagmi/react';
import React, { Fragment } from 'react';
import { useAccount } from 'wagmi';

function truncate(str: string, maxLength: number): string {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}

const WalletConnectButton = ({ size }: any) => {
    const { open } = useWeb3Modal();
    const { address, isConnecting, isDisconnected } = useAccount();

    return (
        <Fragment>
            <button type="button" className="rounded-lg p-2 bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800  text-white" onClick={() => open()}>
                {address ? truncate(address, 8) : 'Connect Wallet'}
            </button>
        </Fragment>
    );
};

export default WalletConnectButton;
