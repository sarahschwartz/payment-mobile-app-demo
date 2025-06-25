import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import LoggedOutView from '@/components/LoggedOutView';
import { AccountDetails } from '@/types';

import sdk from "react-native-zksync-sso";
import { type RpId } from 'react-native-zksync-sso';
const randomChallenge = sdk.utils.generateRandomChallenge();
console.log('randomChallenge: ', randomChallenge);

interface LoginProps {
  rpId: RpId;
}

const Login: React.FC<LoginProps> = () => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(
    null,
  );

  // // Initialize platform-specific logging before any SDK usage
  // sdk.utils.initializePlatformLogger("io.jackpooley.MLSSOExampleRN");

  // const rpId = sdk.utils.createRpId(
  //   "soo-sdk-example-pages.pages.dev", // RP ID (same for both platforms)
  //   "android:apk-key-hash:..." // Android origin - ignored on iOS
  // );
  const rpId: any = '123';
 
  console.log("ACCOUNT DETAILS: ", accountDetails);


  if (accountDetails) {
    router.replace('/(tabs)');
    return null;
  }

  return (
    <View style={styles.navigationContainer}>
      <LoggedOutView
        accountInfo={{
          name: 'JDoe',
          userID: 'jdoe',
          rpId,
        }}
        onAccountCreated={setAccountDetails}
        onSignedIn={setAccountDetails}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    width: '100%',
  },
});

export default Login;

