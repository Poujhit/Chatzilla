import create from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  name: string;
  room: string;
  setName: (name: string) => void;
  setRoom: (room: string) => void;
  clearState: () => void;
};

const roomDataStore = create<State>(
  persist(
    (set) => ({
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
      clearState: () =>
        set((state) => ({
          ...state,
          name: '',
          room: '',
        })),
    }),
    {
      name: 'chatzilla-room-data',
    }
  )
);

export default roomDataStore;
