import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { rehydrate } from '@store/auth';

type RehydrateProviderProps = {
	children: any;
};
const RehydrateProvider = ({ children }: RehydrateProviderProps) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(rehydrate());
	}, []);

	return children;
};

export default RehydrateProvider;
