import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  Platform
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabledButton,
    style,
  ];
  
  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];
  
  const content = loading ? (
    <ActivityIndicator
      color={variant === 'outline' ? '#3B82F6' : 'white'}
      size="small"
    />
  ) : (
    <>
      {icon && icon}
      <Text style={textStyles}>{title}</Text>
    </>
  );

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 1px 2px rgba(15, 23, 42, 0.1)',
      },
    }),
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
  },
  secondaryButton: {
    backgroundColor: '#EFF6FF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3B82F6',
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
      },
      android: {
        elevation: 0,
      },
      web: {
        boxShadow: 'none',
      },
    }),
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
    borderColor: '#E5E7EB',
    ...Platform.select({
      ios: {
        shadowColor: 'transparent',
      },
      android: {
        elevation: 0,
      },
      web: {
        boxShadow: 'none',
      },
    }),
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#3B82F6',
  },
  outlineText: {
    color: '#3B82F6',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});