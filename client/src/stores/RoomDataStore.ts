import create from 'zustand';

type State = {
	name: string;
	room: string;
	setName: (name: string) => void;
	setRoom: (room: string) => void;
};

const roomDataStore = create<State>((set) => ({
	name: '',
	room: '',
	isAuthenticated: false,
	setName: (name) =>
		set((state) => ({
			...state,
			name: name,
		})),
	setRoom: (room) =>
		set((state) => ({
			...state,
			room: room,
		})),
}));

export default roomDataStore;
