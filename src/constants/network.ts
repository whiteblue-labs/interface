export enum ChainIds {
    BASE = 8453,
    BASE_SEPOLIA = 84532,
    SEPOLIA = 11155111,
}

export const ChainsInfo = {
    [ChainIds.BASE]: {
        name: 'Base Network',
        symbol: 'BASE',
    },
    [ChainIds.BASE_SEPOLIA]: {
        name: 'Base Sepolia Network',
        symbol: 'BASE_TESTNET',
    },
    [ChainIds.SEPOLIA]: {
        name: 'Sepolia Network',
        symbol: 'Sepolia',
    },
}

interface IRPC_URL {
    [key: number]: string
}

export const RPC_URL : IRPC_URL= {
    [ChainIds.BASE]: 'https://mainnet.base.org',
    [ChainIds.BASE_SEPOLIA]: 'https://sepolia.base.org',
    [ChainIds.SEPOLIA]: 'wss://ethereum-sepolia-rpc.publicnode.com\t'
}