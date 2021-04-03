import create from 'zustand';

type State={
    isLogin:boolean;
    setSignUp:(isSignUp:boolean)=>void;
}

const authStore = create<State>((set)=>({
    isLogin:true,
    setSignUp:(isSignUp)=> set((state)=>({
        ...state,
        isLogin:isSignUp
    }))
}));


export default authStore;