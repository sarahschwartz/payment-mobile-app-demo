import { type Config } from 'react-native-zksync-sso';

export const config: Config = {
  contracts: {
    accountFactory: "0xda635aA336E8f5c1C3c19e6a0DB6d601Fa1E3e05",
    passkey: "0xa472581Ea2aCa6e6BD8EA6cCA95d3e1297AA5Ae3",
    session: "0x6e2eef457E8A4DC33f6259Ff0A933A2F94d64A8E",
    accountPaymaster: "0x18d0069AC0e0431F2af792Ec425950427B775f1d",
    recovery: "0xE72DA237538a1854535E9565dbEe0B414f382698",
  },
  nodeUrl: "http://localhost:8011/",
  deployWallet: {
    privateKeyHex: "2544c43e10c09cd9bc1ecd30b931545eaf08b01811156714cae8062cbaaa0186"
  }
};