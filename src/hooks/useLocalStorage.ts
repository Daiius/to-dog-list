import React from 'react';
import useMount from './useMount';

export type UseLocalStorageArgs<T> = {
	defaultValue: T;
	key: string;
	mounted: boolean;
};

export type UseLocalStorage<T> = {
	value: T;
	update: (newData: T) => void;
	isLoaded: boolean;
};

const useLocalStorage = <T,>({
	defaultValue,
	key,
	mounted,
}: UseLocalStorageArgs<T>): UseLocalStorage<T> => {
	const [currentValue, setCurrentValue] = React.useState<T>(defaultValue);

	React.useEffect(() => {
		if (mounted) {
			// localStorageからの読み出しが済んでいるはず
			// 値の書き換えを行う
			localStorage?.setItem(key, JSON.stringify(currentValue));
		} else {
			// localStorageに初期値が存在していれば、読みだす
			setCurrentValue(
				localStorage?.getItem(key)
				? JSON.parse(localStorage.getItem(key) ?? 'null')
				: defaultValue
			);
		}
	}, [currentValue]);

	return {
		value: currentValue,
		update: setCurrentValue,
		isLoaded: mounted,
	};
};

export default useLocalStorage;

