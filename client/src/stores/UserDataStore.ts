import create from 'zustand';

type State = {
	email: string;
	userId: string;
	isAuthenticated: boolean;
	setEmail: (email: string) => void;
	setUserId: (userId: string) => void;
	setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const userDataStore = create<State>((set) => ({
	email: '',
	userId: '',
	isAuthenticated: false,
	setEmail: (email) =>
		set((state) => ({
			...state,
			email: email,
		})),
	setUserId: (userId) =>
		set((state) => ({
			...state,
			userId: userId,
		})),
	setIsAuthenticated: (isAuthenticated) =>
		set((state) => ({
			...state,
			isAuthenticated: isAuthenticated,
		})),
}));

export default userDataStore;
