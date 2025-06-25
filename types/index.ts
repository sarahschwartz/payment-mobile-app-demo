import { TokenPriceByAddressResult } from "alchemy-sdk";
import { TransactionResponse } from "zksync-ethers/build/types";
import type { Account, RpId } from 'react-native-zksync-sso';


export interface User {
  address: `0x${string}`;
  name?: string;
  avatar?: string;
  isFriend?: boolean;
}

export interface Tx extends TransactionResponse
{
  isCurrentUser: boolean;
  isFriend: boolean;
}

export interface PriceObject extends TokenPriceByAddressResult {
  fetchTime: number;
}

export interface AccountInfo {
    name: string;
    userID: string;
    rpId: RpId;
}

export interface DeployedAccount {
    info: AccountInfo;
    address: string;
    uniqueAccountId: string;
}

export interface AccountDetails {
    info: AccountInfo;
    address: string;
    shortAddress: string;
    uniqueAccountId: string;
    explorerURL: string;
    balance?: string;
}

export function createAccountDetails(
    accountInfo: AccountInfo,
    deployedAccount: Account,
    balance?: string
): AccountDetails {
    const address = deployedAccount.address;
    return {
        info: accountInfo,
        address,
        shortAddress: shortenAddress(address),
        uniqueAccountId: deployedAccount.uniqueAccountId,
        explorerURL: `https://explorer.zksync.io/address/${address}`,
        balance
    };
}

export function shortenAddress(address: string): string {
    if (!address || address.length < 10) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}