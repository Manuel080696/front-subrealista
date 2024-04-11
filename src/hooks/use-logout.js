import { useContext } from "react";
import { CurrentUserUpdateContext } from "../context/auth-context";

export function useLogout() {
	const setCurrentUser = useContext(CurrentUserUpdateContext);

	return () => {
		localStorage.removeItem(
			`${import.meta.env.VITE_APP_CURRENT_USER_STORAGE_ID}`
		);
		setCurrentUser(null);
	};
}
