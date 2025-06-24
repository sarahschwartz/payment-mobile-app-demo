import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import TransactionCard from '@/components/TransactionCard';
import { Provider } from 'zksync-ethers';
import { getPrices } from '@/utils/prices';
import {
  getData,
  updateHashes,
  maxTxnsLength,
  getStoredHashes,
  getNewTransfers,
} from '@/utils/storage';
import type { PriceObject, Tx } from '@/types';
import { config } from '@/utils/wagmi-config';
import { getBlock, getUniqueTxns } from '@/utils/blocks';

export default function HomeScreen() {
  const [filter, setFilter] = useState<'all' | 'mine'>('all');
  const [txns, setTxns] = useState<Tx[]>();
  const [prices, setPrices] = useState<PriceObject | undefined>(undefined);

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getPrices();
      if (!prices) {
        console.log('No prices found');
        return;
      }
      setPrices(prices);
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    const rpcUrl = config.chains[0].rpcUrls.default.http[0];
    const zkProvider = new Provider(rpcUrl);

    const handleBlock = async (blockNumber: number) => {
      const block = await getBlock(zkProvider, blockNumber);
      if (!block) {
        console.log(`Failed to fetch block ${blockNumber}`);
        return;
      }
      const newTransfers = await getNewTransfers(block, zkProvider);

      if (newTransfers.length) {
        await updateHashes(newTransfers);
        setTxns((prev = []) => {
          const merged = [...prev, ...newTransfers];
          const unique = getUniqueTxns(merged);
          unique.sort((a, b) => b.blockNumber! - a.blockNumber!);
          return unique.slice(0, maxTxnsLength);
        });
      } else {
        console.log('No relevant transfers in this block');
      }
    };

    const setup = async () => {
      const hashes = await getStoredHashes();
      if (!hashes.length) return;

      const stored = await Promise.all(
        hashes.map(async (h) => (await getData(h)) as Tx)
      );
      if (!stored.length) return;
      const unique = getUniqueTxns(stored);
      setTxns(unique);
    };

    setup();

    zkProvider.on('block', handleBlock);
    return () => {
      zkProvider.off('block', handleBlock);
    };
  }, []);

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>ZKsync SSO Pay</Text>
    </View>
  );

  const FilterTabs = () => (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={[styles.filterTab, filter === 'all' && styles.activeFilterTab]}
        onPress={() => setFilter('all')}
      >
        <Text
          style={[
            styles.filterText,
            filter === 'all' && styles.activeFilterText,
          ]}
        >
          All
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterTab, filter === 'mine' && styles.activeFilterTab]}
        onPress={() => setFilter('mine')}
      >
        <Text
          style={[
            styles.filterText,
            filter === 'mine' && styles.activeFilterText,
          ]}
        >
          Mine
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {txns && txns.length && (
        <FlatList
          data={txns.reverse()}
          keyExtractor={(item) => item?.hash as string}
          renderItem={({ item }) => {
            if (filter === 'mine' && !item.isCurrentUser) return null;
            return (
              <TransactionCard
                transaction={item as Tx}
                ethPrice={
                  prices ? parseFloat(prices?.prices[0].value) : undefined
                }
              />
            );
          }}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <>
              <ListHeader />
              <FilterTabs />
            </>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 8 : 48,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter_700Bold',
    color: '#3B82F6',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  activeFilterTab: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#4B5563',
  },
  activeFilterText: {
    color: 'white',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});
