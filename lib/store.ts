import { create } from "zustand"
import { userType } from "./types";

export interface storeType {
    userDetails: userType | null;
    setUserDetails: (newUser: userType) => void;
}
export const useStore = create<storeType>((set) => ({
    userDetails: null,
    setUserDetails: (newUser) => set(() => ({ userDetails: newUser })),
}))