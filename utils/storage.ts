import AsyncStorage from '@react-native-async-storage/async-storage';
import { type Provider, types } from 'zksync-ethers';
import { friends, currentUser } from '@/data/mockData';
import { Tx } from '@/types';

export const storeData = async <T>(key: string, value: T) => {
  await AsyncStorage.setItem(
    key.toString(),
    JSON.stringify(value, (_key, data) =>
      typeof data === 'bigint' ? Number(data) : data
    )
  );
};

export const hashesStorageKey = 'recentTxnHashes';
export const maxTxnsLength = 10;

export const getStoredHashes = async (): Promise<string[]> => {
  const hashes = (await getData(hashesStorageKey)) as string[] | null;
  return Array.isArray(hashes) ? hashes : [];
};

export const updateHashes = async (newTransfers: Tx[]) => {
  const existing = await getStoredHashes();
  const incoming = newTransfers.map((t) => t.hash);
  const combined = [...existing, ...incoming];
  const trimmed = combined.slice(-maxTxnsLength);
  const toDelete = combined.slice(0, combined.length - trimmed.length);
  for (const h of toDelete) await removeData(h);

  await storeData(hashesStorageKey, trimmed);
};

export const handleTx = async (txDetails: types.TransactionResponse) => {
  if (!txDetails) return;

  const isCurrentUser =
    txDetails.from === currentUser.address ||
    txDetails.to === currentUser.address;

  const isFriend = friends.some(
    (f) => f.address === txDetails.from || f.address === txDetails.to
  );

  if (!isCurrentUser && !isFriend) return;

  const tx = { ...txDetails, isCurrentUser, isFriend } as Tx;
  await storeData(tx.hash, tx);
  return tx;
};

export const getData = async <T>(key: string): Promise<T | null> => {
  const json = (await AsyncStorage.getItem(key)) || null;
  return json ? (JSON.parse(json) as T) : null;
};

export const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const getNewTransfers = async (
  block: types.Block,
  provider: Provider
): Promise<Tx[]> => {
  const newTransfers: Tx[] = [];
  if (
    !block ||
    !Array.isArray(block.transactions) ||
    !block.transactions.length
  ) {
    console.log('No transactions in this block', block);
    return newTransfers;
  }


  for (const txHash of block.transactions) {
    const txDetails = await provider.getTransaction(txHash);
    const handled = await handleTx(txDetails);
    if (handled) newTransfers.push(handled);
  }
  return newTransfers;
};
