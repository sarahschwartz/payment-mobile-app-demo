import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { friends } from '@/data/mockData';
import { formatCurrency } from '@/utils/prices';
import { X, Send, FormInput } from 'lucide-react-native';
import Avatar from 'boring-avatars';
import Button from '@/components/Button';
import AmountInput from '@/components/AmountInput';
import { getPrices } from '@/utils/prices';
import { PriceObject } from '@/types';
import Toast from 'react-native-toast-message';
import { parseEther } from 'viem';
import { useSendTransaction } from 'wagmi';
import { privateKeyToAccount } from 'viem/accounts';

export default function SendMoneyScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [amount, setAmount] = useState('');
  // const [loading, setLoading] = useState(false);
  const [gotPrice, setGotPrice] = useState(false);
  const [prices, setPrices] = useState<PriceObject | undefined>(undefined);

  const { sendTransaction, isError, isPending, isSuccess, data, error } =
    useSendTransaction();

  const recipient = friends.find((friend) => friend.address === id);

  const handleClose = () => {
    if (!router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/friends');
    }
  };

  const handleChangeAmount = async (value: string) => {
    if (!gotPrice) {
      const prices = await getPrices();
      if (!prices) {
        console.log('No prices found');
        return;
      }
      setPrices(prices);
      setGotPrice(true);
    }

    setAmount(value);
  };

  const handleSend = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      return;
    }

    // setLoading(true);
    console.log('Sending:', amount);
    const amountInETH = getETHAmount();
    console.log('Amount in ETH:', amountInETH);
    if (!amountInETH) {
      console.log('Invalid ETH amount');
      // setLoading(false);
      return;
    }
    if (!recipient || !recipient.address) {
      console.log('Recipient address is not valid');
      // setLoading(false);
      return;
    }
    await sendETH(amountInETH, recipient.address);
    // setLoading(false);
    console.log('is success:', isSuccess);  
    Toast.show({
      type: 'success',
      text1: 'Transfer Sent 🚀',
      text2: `You sent ${formatCurrency(parseFloat(amount))} to ${
        recipient.name || recipient.address
      }`,
    });
    router.push('/(tabs)/friends');
  };

  async function sendETH(amount: number, recipientAddress: `0x${string}`) {
    console.log(`Sending ${amount} ETH to ${recipientAddress}`);
    const account = privateKeyToAccount('0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110')
    sendTransaction({
      account,
      to: recipientAddress,
      value: parseEther(amount.toString()),
    });
  }

  function getETHAmount() {
    const priceResult = prices?.prices[0].value;
    if (!priceResult || parseFloat(priceResult) <= 0) {
      console.log('ETH price must be greater than zero');
      return;
    }
    const price = parseFloat(priceResult);
    return parseFloat(amount) / price;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <X size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Send Money</Text>
          <View style={styles.headerRight} />
        </View>

        {!recipient ? (
          <ScrollView style={styles.content}>
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientName}>To:</Text>
            <FormInput/>
            <input name="address" placeholder="0xA0Cf…251e" required />
            </View>
            </ScrollView>
            ) : (
        <ScrollView style={styles.content}>
          <View style={styles.recipientContainer}>
            <Avatar
              variant="beam"
              name={recipient.name || recipient.address}
              size={60}
            />
            <Text style={styles.recipientName}>{recipient.name}</Text>
          </View>

          <View style={styles.formContainer}>
            <AmountInput value={amount} onChangeValue={handleChangeAmount} />
          </View>
        </ScrollView>
            )}

        <View style={styles.footer}>
          <Button
            title={`Pay ${
              amount ? formatCurrency(parseFloat(amount)) : '$0.00'
            }`}
            onPress={handleSend}
            icon={<Send size={20} color="white" style={{ marginRight: 8 }} />}
            disabled={!amount || parseFloat(amount) <= 0}
            loading={isPending}
            fullWidth
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 48,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  recipientContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  recipientName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginTop: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  recipientUsername: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  formContainer: {
    marginTop: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
  },
});
