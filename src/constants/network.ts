export enum ChainIds {
    BASE = 8453,
    TAIKO = 167000,
    ARB = 42161
}

export const ChainsInfo = {
    [ChainIds.BASE]: {
        name: 'Base Network',
        symbol: 'BASE',
    },
    [ChainIds.TAIKO]: {
        name: 'Taiko Network',
        symbol: 'BASE',
    },
    [ChainIds.ARB]: {
        name: 'Arbitrum Network',
        symbol: 'ARB',
    },
}

interface IRPC_URL {
    [key: number]: string
}

export const RPC_URL : IRPC_URL= {
    [ChainIds.BASE]: 'https://mainnet.base.org',
    [ChainIds.TAIKO]: 'https://rpc.mainnet.taiko.xyz',
    [ChainIds.ARB]: 'https://arb1.arbitrum.io/rpc',
}