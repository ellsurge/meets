import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Define tuple return type explicitly
type StorageState = [boolean, string, (value: string | null) => void];

function useAsyncState(initialValue: [boolean, string] = [true, '']): StorageState {
  const [state, dispatch] = useReducer(
    (state: [boolean, string], action: { type: 'SET'; payload: string | null }): [boolean, string] => [
      false,
      action.payload ?? '', // Ensure it always returns a string
    ],
    initialValue
  );

  const setValue = useCallback((value: string | null) => dispatch({ type: 'SET', payload: value }), []);

  return [state[0], state[1], setValue];
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === 'web') {
    try {
      value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    value === null ? await SecureStore.deleteItemAsync(key) : await SecureStore.setItemAsync(key, value);
  }
}

export function getStorageState(key: string): StorageState {
  const [loading, state, setState] = useAsyncState();

  useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          setState(localStorage.getItem(key));
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => setState(value));
    }
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [loading, state, setValue];
}

export async function deleteItemAsync(key: string) {
  if (Platform.OS === 'web') {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    await SecureStore.deleteItemAsync(key);
  }
}
