import { Tx } from '@/types';
import { type Provider, types } from 'zksync-ethers';

export const getBlock = async (
  provider: Provider,
  blockNumber: number
): Promise<types.Block | null> => {
  try {
    const block = await provider.getBlock(blockNumber);
    return block;
  } catch (err) {
    console.error(`Failed to fetch block ${blockNumber}`, err);
    return null;
  }
};

export function getUniqueTxns(items: Tx[]): Tx[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if( !item) return false;
    if (seen.has(item.hash)) return false;
    seen.add(item.hash);
    return true;
  });
}
