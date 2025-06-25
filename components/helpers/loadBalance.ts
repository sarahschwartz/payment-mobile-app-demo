// import { config } from './loadConfig';
// import { type AccountBalance, getBalance } from 'react-native-zksync-sso';

/**
 * Loads the balance for an account address
 * @param address The account address to check balance for
 * @returns The formatted balance as a string (e.g. "0.05 ETH")
 */
export const loadBalance = async (address: string): Promise<string> => {
    // const balance: AccountBalance = await getBalance(address, config);
    // return balance.balance;
    console.log("loadBalance - address:", address);
    return "55"
}; 