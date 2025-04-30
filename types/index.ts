import { TokenPriceByAddressResult } from "alchemy-sdk";
import { TransactionResponse } from "zksync-ethers/build/types";

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