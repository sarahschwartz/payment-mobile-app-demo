import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { friends } from '@/data/mockData';
import FriendItem from '@/components/FriendItem';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Search, UserPlus } from 'lucide-react-native';
import { User } from '@/types';

export default function FriendsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ action?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const filteredFriends = friends.filter(friend => {
    if (!searchQuery) return true;
    return (
      friend.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleFriendPress = (friend: User) => {
    router.push(`/send-money/${friend.address}`);
  };

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Friends</Text>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => setSearching(true)}
      >
        <Search size={24} color="#111827" />
      </TouchableOpacity>
    </View>
  );

  const SearchHeader = () => (
    <View style={styles.searchHeader}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
      />
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => {
          setSearching(false);
          setSearchQuery('');
        }}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const AddFriendButton = () => (
    <View style={styles.addFriendContainer}>
      <TouchableOpacity style={styles.addFriendButton}>
        <UserPlus size={20} color="white" />
        <Text style={styles.addFriendText}>Add Friend</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {searching ? <SearchHeader /> : <ListHeader />}
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <FriendItem
            user={item}
            onPress={handleFriendPress}
            onPayPress={handleFriendPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          searchQuery ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No friends found</Text>
            </View>
          ) : null
        }
      />
      {!searching && !params.action && <AddFriendButton />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
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
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  cancelButton: {
    marginLeft: 12,
  },
  cancelText: {
    fontSize: 16,
    color: '#3B82F6',
    fontFamily: 'Inter_500Medium',
  },
  listContent: {
    flexGrow: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 76,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    fontFamily: 'Inter_400Regular',
  },
  addFriendContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addFriendButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  addFriendText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: 'Inter_600SemiBold',
  },
});