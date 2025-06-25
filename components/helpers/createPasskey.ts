import { config } from './loadConfig';
// import sdk from 'react-native-zksync-sso';
import type { AccountInfo, DeployedAccount } from '@/types';

/**
 * Creates a passkey for the given account info
 * @param accountInfo Account info to create a passkey for
 * @returns Deployed account information
 */
export const createPasskey = async (
    accountInfo: AccountInfo
): Promise<DeployedAccount> => {
    console.log("createPasskey - accountInfo:", accountInfo);
    console.log("createPasskey - config:", config);
    // const challenge = sdk.utils.generateRandomChallenge();
    // console.log("createPasskey - challenge:", challenge);
    // const rpIdString = sdk.utils.getRpIdString(accountInfo.rpId);
    // const account = await sdk.register.registerAccountWithUniqueId(
    //     {
    //         name: accountInfo.name,
    //         userID: accountInfo.userID,
    //         rp: {
    //             name: rpIdString,
    //             id: accountInfo.rpId
    //         }
    //     },
    //     challenge,
    //     config
    // );
    // console.log("createPasskey - account deployed:", account);
    // return {
    //     info: accountInfo,
    //     address: account.address,
    //     uniqueAccountId: account.uniqueAccountId
    // };
    return {
        info: accountInfo,
        address: '0x123',
        uniqueAccountId: '123'
    };
};