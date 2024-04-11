import { useContext } from "react";
import { CurrentUserContext } from "../Context/auth-context";

export function useCurrentUser() {
  const currentUser = useContext(CurrentUserContext);
  return currentUser;
}
