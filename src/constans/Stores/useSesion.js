import { create } from "zustand";
export const useSession = create((set) =>{
    return{
        user: null,
        isLoggedIn: false,
        login: (newuser) => {
            set({user: newuser, isLoggedIn: true})
        },
        logout: () => {
            set({user: null, isLoggedIn: false})
        }
    }
})