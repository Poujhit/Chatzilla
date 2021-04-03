import create from 'zustand';

const authStore = create((set)=>({
    isLogin:true,
    setSignUp:(isSignUp:boolean)=> set((state)=>({
        ...state,
        isLogin:isSignUp
    }))
}));


export default authStore;