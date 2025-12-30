import type { User } from "@/types";
import { create } from "zustand";

interface Profile {
	name: string;
	email: string;
	bio: string;
}

interface StoreState {
	// State
	users: User[];
	darkMode: boolean;
	sidebarOpen: boolean;
	profile: Profile;

	// Actions
	setUsers: (users: User[]) => void;
	addUser: (user: User) => void;
	updateUser: (id: string, data: Partial<User>) => void;
	deleteUser: (id: string) => void;
	toggleDarkMode: () => void;
	toggleSidebar: () => void;
	updateProfile: (data: Partial<Profile>) => void;
}

export const useStore = create<StoreState>((set) => ({
	// Initial state
	users: [],
	darkMode: false,
	sidebarOpen: true,
	profile: {
		name: "Admin User",
		email: "admin@example.com",
		bio: "",
	},

	// Actions
	setUsers: (users) => set({ users }),

	addUser: (user) =>
		set((state) => ({
			users: [...state.users, user],
		})),

	updateUser: (id, data) =>
		set((state) => ({
			users: state.users.map((user) =>
				user.id === id ? { ...user, ...data } : user
			),
		})),

	deleteUser: (id) =>
		set((state) => ({
			users: state.users.filter((user) => user.id !== id),
		})),

	toggleDarkMode: () =>
		set((state) => {
			const newDarkMode = !state.darkMode;
			// Appliquer la classe dark au document
			if (typeof document !== "undefined") {
				if (newDarkMode) {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			}
			return { darkMode: newDarkMode };
		}),

	toggleSidebar: () =>
		set((state) => ({
			sidebarOpen: !state.sidebarOpen,
		})),

	updateProfile: (data) =>
		set((state) => ({
			profile: { ...state.profile, ...data },
		})),
}));
