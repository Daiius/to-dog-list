import React from 'react';

const useMount = (): { mounted: boolean } => {
	const [mounted, setMounted] = React.useState<boolean>(false);
	React.useEffect(() => setMounted(true), []);
	return { mounted };
};

export default useMount;

