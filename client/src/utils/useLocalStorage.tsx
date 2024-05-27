import { useState } from "react";
import { useToast } from "../features/notification/useToast";
import { themeType } from "../features/theme/useTheme";

// Define a type for allowable keys and values in localStorage to ensure type safety and prevent typos.
type LocalStorageValueMap = {
	theme: themeType;
};

type LocalStorageValue<T extends keyof LocalStorageValueMap> = LocalStorageValueMap[T];

const useLocalStorage = <K extends keyof LocalStorageValueMap>(
	key: K,
): [LocalStorageValue<K> | null, (value: LocalStorageValue<K>) => void] => {
	const toast = useToast();
	const [storedValue, setStoredValue] = useState<LocalStorageValue<K> | null>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? (JSON.parse(item) as LocalStorageValue<K>) : null;
		} catch (error) {
			toast.add("localStorage", "Failed to read from localStorage", "danger");
			return null;
		}
	});

	const setValue = (value: LocalStorageValue<K>) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
		} catch (error) {
			toast.add("localStorage", "Failed to save to localStorage", "danger");
		}
	};

	return [storedValue, setValue];
};

export default useLocalStorage;
