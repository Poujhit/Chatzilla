import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

type State = {
  name: string;
  room: string;
  setName: (name: string) => void;
  setRoom: (room: string) => void;
  clearState: () => void;
};

type MyPersist = (
  config: StateCreator<State>,
  options: PersistOptions<State>
) => StateCreator<State>;

const roomDataStore = create<State>(
  (persist as MyPersist)(
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
