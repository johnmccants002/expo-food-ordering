import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";

// Define the shape of the context
interface AuthContextType {
  session: any; // Consider using a more specific type if available
  setSession: React.Dispatch<React.SetStateAction<any>>;
  refreshSession: () => Promise<void>; // Method to manually refresh the session
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<any>(null);

  // Method to fetch the session
  const fetchSession = useCallback(async () => {
    console.log("FETCHING SESSION: CALLBACK");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("THIS IS THE SESSION: ", session?.user.email);
    setSession(session);
  }, []);

  useEffect(() => {
    fetchSession(); // Initial fetch

    // Set up the subscription
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener?.unsubscribe();
    };
  }, [fetchSession]);

  useEffect(() => {
    console.log("Refreshing session");
    refreshSession();
  }, []);

  // Expose the method to manually refresh the session
  const refreshSession = async () => {
    await fetchSession();
  };

  return (
    <AuthContext.Provider value={{ session, setSession, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
