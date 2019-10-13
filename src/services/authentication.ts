import { User, getUser } from "@/repositories/user";
import { Role } from "@/repositories/Role";

export let user: User | undefined;

export async function authenticate(id: number) {
  user = await getUser(id);
}

export function isAuthenticated() {
  return user !== undefined;
}

export function getRole(): Role {
  return user.role;
}
