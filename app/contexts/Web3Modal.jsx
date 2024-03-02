"use client";

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import { mainnet, bsc } from 'viem/chains'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '456c97ebd03768100b1f877bb14acac8'

// 2. Create wagmiConfig
const metadata = {
  name: 'Crypto-Society',
  description: 'Crypto Society is a community created by and for individuals passionate about cryptocurrency. Our objective is to enlighten members about various aspects of crypto through the distribution of our research. We encourage our members to engage in learning and to actively participate in sharing their insights.',
  url: 'https://crypto-society.com',
  icons: ['https://crypto-society.com/favicon.png']
}

const chains = [mainnet, bsc]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

export function Web3Modal({ children }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}

