import { 
  AuthData,
  IAuthService 
} from "../interfaces/IAuthService";
import { FIREBASE_AUTH } from "../../configs/firebaseConfig";
import { 
  signInWithEmailAndPassword , 
  onAuthStateChanged,
  signOut,
  getAuth
} from "@react-native-firebase/auth";
import { User } from "../../types/User";

export class FirebaseAuthService implements IAuthService {
  private auth;

  constructor() {
    this.auth = getAuth();
  }

  async signInWithEmailAndPassword(data: AuthData): Promise<boolean> {
    try {
      await signInWithEmailAndPassword(this.auth, data.email, data.password);
      return true
    } catch (error) {
      console.error("Error signing in with email and password:", error);
      throw error;
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }
  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }
}