'use client';

import React from 'react';

export type Settings = {
	headingTrained: boolean; // 犬の向きをそろえるかどうか
	setHeadingTrained: (newHeadingTrained: boolean) => void;
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
	const [headingTrained, setHeadingTrained] = React.useState<boolean>(localStorage.getItem('headingTrained') === 'true');

	const onHeadingTrainedChange = (newHeadingTrained: boolean) => {
		setHeadingTrained(newHeadingTrained);
		localStorage.setItem('headingTrained', newHeadingTrained.toString());
	};

	return (
		<SettingsContext.Provider
			value={{ 
				headingTrained,
				setHeadingTrained: onHeadingTrainedChange
		 	}}
		>
		 	{children}
		</SettingsContext.Provider>
	);
};

export default SettingsProvider;

