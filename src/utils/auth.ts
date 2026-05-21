import { Role, UserProfile } from "../types";

export function createUser(name: string, email: string, password: string, role: Role): UserProfile {
  return {
    id: crypto.randomUUID(),
    name,
    email: email.toLowerCase(),
    password,
    role,
    bio: "Aspiring digital marketer building consistent practice every week.",
    goal: "Complete the roadmap and earn my first certificate.",
    joinedAt: new Date().toISOString(),
  };
}

export function verifyLogin(users: UserProfile[], email: string, password: string) {
  return users.find((user) => user.email === email.toLowerCase() && user.password === password) || null;
}
