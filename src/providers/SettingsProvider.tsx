'use client';

import React from 'react';
import useMount from '@/hooks/useMount';
import useLocalStorage from '@/hooks/useLocalStorage';

export type Settings = {
	headingTrained: boolean; // 犬の向きをそろえるかどうか
	setHeadingTrained: (newHeadingTrained: boolean) => void;
	mounted: boolean;
};

const SettingsContext = React.createContext<Settings|undefined>(undefined);

export const useSettings = () =>
	React.useContext(SettingsContext)
	?? (() => {
		throw new Error('useSettings() is called out of the context!');
	})();

const SettingsProvider: React.FC<React.PropsWithChildren> = ({
	children 
}) => {
	// このmountedは、localStorageから
	// 初期値を読み出したか否かの判定に用います
	// 一時期はいくつかのコンポーネントに分散してしまっていましたが、
	// 最初の描画時一度だけ実行されることが重要なので、
	// SettingsProviderにまとめてしまおうと思います
	const { mounted } = useMount();
	const {
		value: headingTrained, 
		update: setHeadingTrained
	} = useLocalStorage<boolean>({
		key: 'headingTrained',
		defaultValue: false,
		mounted,
	});

	return (
		<SettingsContext.Provider
			value={{ 
				headingTrained,
				setHeadingTrained,
				mounted,
		 	}}
		>
		 	{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;

