// import { type Account, getAccountByUserId } from 'react-native-zksync-sso';
// import { config } from './loadConfig';

export const getAccountByUserIdWrapper = async (
    uniqueAccountId: string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
// ): Promise<Account> => {
    // const account: Account = await getAccountByUserId(
    //     uniqueAccountId,
    //     config
    // );
    // console.log('Account implementation returned:', account);
    // return account;
    return { address: '0x123', uniqueAccountId: uniqueAccountId, info: { name: 'Test Account', userID: 'user123', rpId: 'rp123' }};
};