import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { formatCurrency } from '@/utils/prices';
import Avatar from "boring-avatars";
import { Heart, MessageSquare } from 'lucide-react-native';
import type { Tx } from '@/types';
import { ethers } from 'ethers';
import { currentUser, friends } from '@/data/mockData';

interface TransactionCardProps {
  transaction: Tx;
  onLike?: (id: string) => void;
  ethPrice?: number;
}

export default function TransactionCard({
  transaction,
  onLike,
  ethPrice
}: TransactionCardProps) {
  const {
   value,
   to,
   from,
   hash,
  } = transaction;
  
  const parsedValue = ethers.formatEther(typeof value === 'number' ? BigInt(value) : value);
  const dollarAmount = parseFloat(parsedValue) * (ethPrice || 0);
 
  const fromAddress = `${from.substring(0, 6)}...`;
  const toAddress = `${to?.substring(0, 6)}...`; 
  const userRecievedMoney = to == currentUser.address;
  const userSentMoney = from == currentUser.address;

  const fromFriend = friends.find(friend => friend.address === from)?.name || fromAddress;
  const fromName = userRecievedMoney || userSentMoney ? "You" : fromFriend;
  const toName = userRecievedMoney ? fromFriend : friends.find(friend => friend.address === to)?.name || toAddress;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Avatar
            variant="beam"
            name={fromName}
            size={50}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {fromName}
              <Text style={styles.preposition}> {userRecievedMoney ? 'got paid by' : 'paid'} </Text>
              {toName}
            </Text>
          </View>
          <Text style={styles.timestamp}>TX: {`${hash.substring(0, 8)}...`}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[
            styles.amount,
            userRecievedMoney ? styles.positive : styles.negative
          ]}>
            {userRecievedMoney ? '+' : '-'} {dollarAmount === 0 ? "" : formatCurrency(dollarAmount)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => onLike?.('id')}
        >
          <Heart 
            size={20}
            color={'#9CA3AF'}
            fill={'transparent'}
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
        >
          <MessageSquare size={20} color="#9CA3AF" />
          
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  header: {
    flexDirection: 'row',
  },
  avatarContainer: {
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  preposition: {
    fontWeight: '400',
  },
  privateIcon: {
    marginLeft: 4,
  },
  description: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 4,
  },
  amountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: '#10B981',
  },
  negative: {
    color: '#111827',
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 4,
  },
  pendingText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#D97706',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionCount: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
});