import { User } from "../../types/User";
export type AuthData = {
  email: string
  password: string
}
export interface IAuthService {
   signInWithEmailAndPassword(data: AuthData): Promise<boolean>;
   signOut(): void;
   onAuthStateChanged(callback: (user: User | null) => void): () => void;
}