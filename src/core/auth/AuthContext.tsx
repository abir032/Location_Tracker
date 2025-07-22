import { FirebaseAuthService } from "./Providers/FirebaseAuthService";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { AuthData, IAuthService } from "./interfaces/IAuthService";

interface AuthContextType {
  user: User | null;
  signIn: (data: AuthData) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const authService: IAuthService = new FirebaseAuthService();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      console.log("User in AuthContext:", user);
      setUser(user);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (data: AuthData) => {
    await authService.signInWithEmailAndPassword(data);
  };

  const signOut = async () => {
    await authService.signOut();
  };

  return (
    <AuthContext.Provider value={{user, signIn, signOut, isLoading}}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}