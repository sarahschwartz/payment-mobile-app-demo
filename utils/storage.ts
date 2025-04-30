import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async <T>(key: string, value: T) => {
  await AsyncStorage.setItem(key.toString(), JSON.stringify(value, (_key, data) =>
    typeof data === "bigint" ? Number(data) : data,
  ));
};

export const getData = async <T>(key: string): Promise<T | null> => {
  const json = await AsyncStorage.getItem(key) || null;
  return json ? (JSON.parse(json) as T) : null;
}

export const removeData = async (key: string) => {
  await AsyncStorage.removeItem(key);
}