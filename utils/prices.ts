import { Alchemy, type TokenAddressRequest } from 'alchemy-sdk';
import { utils } from "zksync-ethers"
import { getData, storeData } from './storage';
import { PriceObject } from '@/types';

// replace with your Alchemy API key
const API_KEY = process.env.ALCHEMY_API_KEY;

export const getLatestPrices = async (addresses: TokenAddressRequest[] = []) => {
  try {
    const alchemy = new Alchemy({ apiKey: API_KEY });
    const zksyncSepoliaETH: TokenAddressRequest = { network: alchemy.config.network, address: utils.ETH_ADDRESS};
    const response = await alchemy.prices.getTokenPriceByAddress([zksyncSepoliaETH, ...addresses]);
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

export const getPrices = async () => {
  try {
   const storedPrices = await getData<PriceObject>('prices');
   // only fetch prices if they are not stored
   // or if they are older than 2 minutes
   const fetchIntervalMinutes = 2;
   if(storedPrices && storedPrices.fetchTime && (Date.now() - storedPrices.fetchTime < 1000 * 60 * fetchIntervalMinutes)) {
    return storedPrices;
   } else {
     const prices = await getLatestPrices();
     if(!prices) {
       console.log('No prices found');
       return storedPrices ?? undefined
     }
     const currentTime = Date.now();
     const priceObject: PriceObject = {
       ...prices[0],
       fetchTime: currentTime
     }
     await storeData('prices', priceObject);
     return priceObject;
   }
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};
