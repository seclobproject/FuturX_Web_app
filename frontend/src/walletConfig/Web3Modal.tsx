import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

const bsc = {
    chainId: 56,
    name: 'BNB Smart Chain Mainnet',
    currency: 'BNB',
    explorerUrl: 'https://bscscan.com',
    rpcUrl: 'https://rpc.ankr.com/bsc'
}

const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://rpc-sepolia.rockx.com'
}

export const projectId = 'b4024fbeee0399ffbcb8201ed2e7c652'


// 3. Create a metadata object
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://login.futurx.vip', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

const ethersConfig = defaultConfig({
    /*Required*/
    metadata,
    defaultChainId: 56 // used for the Coinbase SDK
})

export const modalConfig = {
    ethersConfig,
    chains: [
        bsc, 
        // sepolia
    ],
    projectId,
    enableAnalytics: false,
    // termsConditionsUrl: 'https://www.mytermsandconditions.com',
    // privacyPolicyUrl: 'https://www.myprivacypolicy.com',
}

