import BSCUSDTABI from '../abis/bsc_usdt.json';
import BSCUSDCABI from '../abis/bsc_usdc.json';
import ETHUSDTABI from '../abis/eth_usdt.json';
import ETHUSDCABI from '../abis/eth_usdc.json';

export const tokens = [
	{
		symbol: "USDT",
		contract: "0x55d398326f99059fF775485246999027B3197955",
		chain: "bsc",
		abi: BSCUSDTABI
	},
	{
		symbol: "USDC",
		contract: "0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2",
		chain: "bsc",
		abi: BSCUSDCABI
	},
	{
		symbol: "USDT",
		contract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		chain: "eth",
		abi: ETHUSDTABI
	},
	{
		symbol: "USDC",
		contract: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
		chain: "eth",
		abi: ETHUSDCABI
	}
];

export function getToken(chain, symbol) {
	return tokens.find(token => token.chain === chain && token.symbol === symbol);
}