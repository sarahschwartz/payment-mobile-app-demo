import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Avatar from 'boring-avatars'
import { User } from '@/types';
import { DollarSign } from 'lucide-react-native';

interface FriendItemProps {
  user: User;
  onPress: (user: User) => void;
  onPayPress?: (user: User) => void;
}

export default function FriendItem({ user, onPress, onPayPress }: FriendItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(user)}
      activeOpacity={0.7}
    >
      <Avatar
        variant="beam"
        name={user.name ?? "Friend"}
        size={48}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.address}</Text>
      </View>
      {onPayPress && (
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => onPayPress(user)}
        >
          <DollarSign size={20} color="#3B82F6" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  username: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  payButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});