import { useContext } from "react";
import { CurrentUserContext } from "../context/auth-context";

export function useCurrentUser() {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
}
