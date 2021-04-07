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
	setName: (newname) =>
		set(
			(state) => ({
				...state,
				name: newname,
			}),
			true
		),
	setRoom: (roomname) =>
		set(
			(state) => ({
				...state,
				room: roomname,
			}),
			true
		),
}));

export default roomDataStore;
