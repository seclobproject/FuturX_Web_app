import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

import { WagmiConfig } from 'wagmi';
// import { sepolia } from 'viem/chains';
import { mainnet } from 'viem/chains'; // OG

// 1. Get projectId
const projectId = 'b4024fbeee0399ffbcb8201ed2e7c652';

// 2. Create wagmiConfig
const metadata = {
    name: 'Web3Modal',
    description: 'Web3Modal Example',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// const chains = [sepolia]
const chains = [mainnet]; // OG
const wagmiConfig: any = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains, defaultChain: mainnet }); // 'defaultChain: mainnet' also has to added. Not checked after adding default chain

export function Web3Modal({ children }: any) {
    return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
