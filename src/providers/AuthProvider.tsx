// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

// Define the shape of the context
interface AuthContextType {
  session: any; // You can replace `any` with a more specific type
  setSession: React.Dispatch<React.SetStateAction<any>>; // Same here for the specific type
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>({
  session: null,
  setSession: null,
});

interface AuthProviderProps {
  children: ReactNode; // This ensures `children` is correctly typed
}

// AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  console.log("IN AUTH PROVIDER");
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Define an async function to fetch the current session
    const fetchSession = async () => {
      console.log("FETCH SESSION CALLED");
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session, "THIS IS THE DATA");
      setSession(session);
    };

    // Call the async function
    fetchSession();

    // Set up the subscription
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription on component unmount
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
