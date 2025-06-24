import React, { useState, useRef, useEffect } from 'react';
import { Wallet } from 'lucide-react-native';
import { View, TextInput, StyleSheet, Animated, Platform } from 'react-native';

interface AddressInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export default function AddressInput({
  value,
  onChangeText,
  placeholder = '0xA0Cf…251e',
}: AddressInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, animatedValue]);

  const labelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 0],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [24, 14],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9CA3AF', '#3B82F6'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>
        Recipient
      </Animated.Text>
      <View style={styles.inputContainer}>
        <Wallet style={styles.currencySymbol} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor="#3B82F6"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 40
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: -8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: '600',
    color: '#111827',
    padding: 0,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
});
