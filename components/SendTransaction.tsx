import * as React from 'react';
import Toast from 'react-native-toast-message';
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({ hash });


  React.useEffect(() => {
    if (isConfirmed) {
      Toast.show({
        type: 'success',
        text1: 'Transaction confirmed',
        text2: hash ? `${hash.slice(0, 10)}…` : undefined,
      });
    }
  }, [isConfirmed, hash]);

  React.useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Transaction failed',
        text2:
          (error as BaseError).shortMessage ||
          (error as Error).message ||
          undefined,
      });
    }
  }, [error]);

  React.useEffect(() => {
    if (isPending) {
      Toast.show({
        type: 'info',
        text1: 'Sending transaction…',
        autoHide: true,
        visibilityTime: 3000,
      });
    }
  }, [isPending]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get('address') as `0x${string}`;
    const value = formData.get('value') as string;

    const account = privateKeyToAccount(
      '0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110',
    );
    sendTransaction({ account, to, value: parseEther(value) });
  }

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending || isConfirming} type="submit">
        {isPending || isConfirming ? 'Confirming…' : 'Send'}
      </button>
    </form>
  );
}
