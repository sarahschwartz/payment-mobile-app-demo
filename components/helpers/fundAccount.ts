import { config } from './loadConfig';
import { fundAccount as sdkFundAccount } from 'react-native-zksync-sso';

/**
 * Funds an account with test ETH
 * @param address The account address to fund
 * @returns The new balance after funding
 */
export const fundAccount = async (address: string): Promise<void> => {
    await sdkFundAccount(address, config);
}; 