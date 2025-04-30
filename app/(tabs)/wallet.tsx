import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { formatCurrency } from '@/utils/prices';
import { ArrowUpRight } from 'lucide-react-native';
import { currentUser } from '@/data/mockData';
import { getPrices } from '@/utils/prices';
import { Provider } from 'zksync-ethers';
import { ethers } from 'ethers';
import { PriceObject } from '@/types';
import Avatar from 'boring-avatars';

export default function WalletScreen() {
  const [prices, setPrices] = useState<PriceObject | undefined>(
      undefined
    );
  const [balance, setBalance] = useState<string>();
    
   useEffect(() => {
      const fetchPrices = async () => {
        const prices = await getPrices();
        if(!prices) {
          console.log('No prices found');
          return;
        }
        setPrices(prices);

        // set balance
        const zkProvider = new Provider('http://localhost:8011');
        const balance = await zkProvider.getBalance(currentUser.address);
        setBalance(ethers.formatEther(balance));
      };
      fetchPrices();
    }, []);

  const getAmountInDollars = (value: number) => {
    if (!prices) return;
    const priceResult = prices.prices[0].value;
    if (!priceResult || parseFloat(priceResult) <= 0) {
      console.log("Price must be greater than zero");
      return;
    }
    const price = parseFloat(priceResult);
    return value * price;
  };

  const amountInDollars = balance ? getAmountInDollars(parseFloat(balance)) : undefined;
    
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Avatar
              variant="beam"
              name={"You"}
              size={60}
            />
        <Text style={styles.title}>Your Wallet</Text>
        <br/>
        <Text style={styles.sectionTitle}>Your address:</Text>
        <Text style={styles.sectionTitle}>{currentUser.address}</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>SSO Balance</Text>
          <Text style={styles.balanceAmount}>{amountInDollars ? formatCurrency(amountInDollars) : '0.00'}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionIconContainer}>
                <ArrowUpRight size={20} color="#3B82F6" />
              </View>
              <Text style={styles.actionText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 16 : 48,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    color: '#111827',
  },
  content: {
    padding: 16,
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  balanceLabel: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter_500Medium',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginTop: 4,
    fontFamily: 'Inter_700Bold',
  },
  pendingAmount: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  actionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#4B5563',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter_600SemiBold',
  },
  cardPromoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardPromoContent: {
    flex: 1,
  },
  cardPromoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    fontFamily: 'Inter_600SemiBold',
  },
  cardPromoText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  applyButton: {
    marginTop: 8,
  },
});