
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, signIn, signOut as supabaseSignOut } from '@/lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Check if the user is an admin
        if (session?.user) {
          try {
            const { data } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            
            setIsAdmin(data?.role === 'admin');
          } catch (err) {
            console.error('Error checking admin status:', err);
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      
      // Check if the user is an admin
      if (session?.user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          setIsAdmin(data?.role === 'admin');
        } catch (err) {
          console.error('Error checking admin status:', err);
          setIsAdmin(false);
        }
      }
      
      setIsLoading(false);
    };

    initAuth();

    // Clean up the subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const { user, session } = await signIn(email, password);
      setUser(user);
      setSession(session);
      
      // Check if the user is an admin
      if (user) {
        try {
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();
          
          setIsAdmin(data?.role === 'admin');
        } catch (err) {
          console.error('Error checking admin status:', err);
          setIsAdmin(false);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await supabaseSignOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    } catch (err: any) {
      setError(err.message || 'Failed to logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      isAdmin, 
      isLoading, 
      error, 
      login, 
      logout, 
      clearError 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
